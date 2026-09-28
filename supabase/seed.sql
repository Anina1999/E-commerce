do $$
declare
  admin_id uuid;
begin
  select id into admin_id from auth.users where email = 'admin.tour@gmail.com';

  if admin_id is null then
    raise exception 'Create admin.tour@gmail.com in Authentication -> Users first';
  end if;

  update public.profiles
  set role = 'admin', username = 'Tourashop Admin'
  where id = admin_id;

  delete from public.products where owner_id = admin_id;

  insert into public.products (owner_id, name, price, category, image_url, description) values
    (admin_id, 'Trail Hiking Boots', 165.00, 'hiking', '/assets/images/product-hiking-boots.jpg',
      'Waterproof leather boots with a grippy sole and ankle support for rocky mountain trails.'),
    (admin_id, 'Trekking Poles', 60.00, 'hiking', '/assets/images/product-trekking-poles.jpg',
      'Lightweight adjustable aluminium poles that take the load off your knees on steep descents.'),
    (admin_id, 'Waterproof Shell Jacket', 210.00, 'hiking', '/assets/images/product-shell-jacket.jpg',
      'Breathable three-layer shell that keeps out wind and rain, with a helmet-compatible hood.'),
    (admin_id, 'Daypack 30L', 95.00, 'hiking', '/assets/images/product-daypack.jpg',
      'Ventilated 30 litre backpack with a hip belt, rain cover and a sleeve for a water bladder.'),

    (admin_id, 'Road Running Shoes', 135.00, 'running', '/assets/images/product-running-shoes.jpg',
      'Cushioned daily trainers with a responsive foam midsole for long runs on asphalt.'),
    (admin_id, 'Split Running Shorts', 40.00, 'running', '/assets/images/product-running-shorts.jpg',
      'Light split-leg shorts with a built-in brief and a zip pocket for keys or a gel.'),
    (admin_id, 'Hydration Vest', 85.00, 'running', '/assets/images/product-hydration-vest.jpg',
      'Snug running vest with two soft flasks and front pockets for your phone and snacks.'),
    (admin_id, 'Merino Running Tee', 55.00, 'running', '/assets/images/product-running-tee.jpg',
      'Soft merino wool tee that wicks sweat, stays warm when wet and resists odour.'),

    (admin_id, 'Aero Bike Helmet', 120.00, 'biking', '/assets/images/product-bike-helmet.jpg',
      'Aerodynamic road helmet with MIPS protection and adjustable vents.'),
    (admin_id, 'Cycling Gloves', 25.00, 'biking', '/assets/images/product-cycling-gloves.jpg',
      'Fingerless gloves with gel padding in the palm to reduce vibration on long rides.'),
    (admin_id, 'Bib Shorts', 90.00, 'biking', '/assets/images/product-bib-shorts.jpg',
      'Padded bib shorts with a seamless chamois and breathable mesh straps.'),
    (admin_id, 'Handlebar Bag', 45.00, 'biking', '/assets/images/product-handlebar-bag.jpg',
      'Water-resistant roll-top bag that straps to the handlebar for bikepacking trips.'),

    (admin_id, 'Climbing Harness', 95.00, 'climbing', '/assets/images/product-climbing-harness.jpg',
      'Comfortable sport climbing harness with four gear loops and adjustable leg loops.'),
    (admin_id, 'Chalk Bag', 18.00, 'climbing', '/assets/images/product-chalk-bag.jpg',
      'Chalk bag with a brush holder and a drawstring closure that keeps the chalk inside.'),
    (admin_id, 'Approach Shoes', 140.00, 'climbing', '/assets/images/product-approach-shoes.jpg',
      'Sticky rubber approach shoes for scrambling to the crag and easy climbing.'),
    (admin_id, 'Belay Jacket', 110.00, 'climbing', '/assets/images/product-belay-jacket.jpg',
      'Warm synthetic insulated jacket to throw on while belaying on cold days.');
end;
$$;
