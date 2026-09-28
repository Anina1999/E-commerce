drop trigger if exists on_auth_user_created on auth.users;
drop table if exists public.orders, public.favorites, public.reviews, public.products, public.profiles cascade;
drop function if exists public.handle_new_user, public.is_admin, public.set_review_hidden, public.set_updated_at;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, username)
select id, raw_user_meta_data ->> 'username' from auth.users
on conflict (id) do nothing;

create table public.products (
  id bigint generated always as identity primary key,
  owner_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 100),
  price numeric(10, 2) not null check (price > 0),
  sale_price numeric(10, 2),
  category text not null check (category in ('hiking', 'running', 'biking', 'climbing')),
  image_url text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  constraint sale_price_below_price check (sale_price > 0 and sale_price < price)
);

create index products_category_idx on public.products (category);
create index products_owner_id_idx on public.products (owner_id);

create table public.reviews (
  id bigint generated always as identity primary key,
  product_id bigint not null references public.products (id) on delete cascade,
  author_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  content text not null check (char_length(content) between 1 and 1000),
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, author_id)
);

create index reviews_author_id_idx on public.reviews (author_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger reviews_set_updated_at
  before update on public.reviews
  for each row
  when (old.rating is distinct from new.rating or old.content is distinct from new.content)
  execute function public.set_updated_at();

create table public.favorites (
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  product_id bigint not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create index favorites_product_id_idx on public.favorites (product_id);

create table public.orders (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  customer_email text not null,
  shipping jsonb not null,
  items jsonb not null check (jsonb_typeof(items) = 'array'),
  total numeric(10, 2) not null check (total > 0),
  status text not null default 'pending' check (status in ('pending', 'cancelled')),
  created_at timestamptz not null default now()
);

create index orders_user_id_idx on public.orders (user_id);

create function public.set_review_hidden(review_id bigint, hidden boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Only admins can hide reviews' using errcode = '42501';
  end if;

  update public.reviews set is_hidden = hidden where id = review_id;
end;
$$;

revoke execute on function public.set_review_hidden(bigint, boolean) from public, anon;
grant execute on function public.set_review_hidden(bigint, boolean) to authenticated;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.orders enable row level security;

create policy "Profiles are visible to everyone"
  on public.profiles for select
  using (true);

create policy "Users update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (username) on public.profiles to authenticated;

create policy "Products are visible to everyone"
  on public.products for select
  using (true);

create policy "Admins create their own products"
  on public.products for insert to authenticated
  with check ((select public.is_admin()) and owner_id = (select auth.uid()));

create policy "Owners update their products"
  on public.products for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "Owners delete their products"
  on public.products for delete to authenticated
  using (owner_id = (select auth.uid()));

create policy "Visible reviews for everyone, hidden ones for the author and admins"
  on public.reviews for select
  using (
    not is_hidden
    or author_id = (select auth.uid())
    or (select public.is_admin())
  );

create policy "Users write their own reviews"
  on public.reviews for insert to authenticated
  with check (author_id = (select auth.uid()) and not is_hidden);

create policy "Authors update their reviews"
  on public.reviews for update to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "Authors delete their reviews"
  on public.reviews for delete to authenticated
  using (author_id = (select auth.uid()));

revoke update on public.reviews from anon, authenticated;
grant update (rating, content) on public.reviews to authenticated;

create policy "Users see their favorites"
  on public.favorites for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Users add their favorites"
  on public.favorites for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "Users remove their favorites"
  on public.favorites for delete to authenticated
  using (user_id = (select auth.uid()));

create policy "Users see their orders, admins see all"
  on public.orders for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Users place their own orders"
  on public.orders for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'pending');

create policy "Users cancel their pending orders"
  on public.orders for update to authenticated
  using (user_id = (select auth.uid()) and status = 'pending')
  with check (user_id = (select auth.uid()) and status = 'cancelled');

revoke update on public.orders from anon, authenticated;
grant update (status) on public.orders to authenticated;
