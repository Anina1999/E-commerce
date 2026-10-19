# Tourashop - React e-commerce project

Tourashop is an online shop for outdoor gear for hiking, running, biking and climbing.

## Live demo

- - - - -
<!-- TODO: add the deploy link -->

## Tech stack

- React 19 with Vite 8
- React Router 8 for the pages and the URL params
- Supabase with the supabase-js SDK for the database, login and register
- Swiper for the product carousels on the home page
- CSS Modules next to each component, plus Bootstrap 4 grid, Font Awesome icons and a global main.css from the template
- React Compiler

## Getting started

You need Node.js 20.19 or newer, because Vite 8 asks for it.

1. Clone the repository and install the packages:
   ```
   git clone https://github.com/Anina1999/E-commerce.git
   cd E-commerce
   npm install
   ```
2. Copy `.env.example` to a new file `.env` and fill in the URL and the publishable key of your Supabase project. You can find both in the Supabase dashboard.
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```
   `.env` is in `.gitignore`, so the keys don't go to GitHub. If one of them is missing, the page stays empty and the browser console shows the error "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env".
3. Set up the database, see [Database setup](#database-setup) below.
4. Start the app and open http://localhost:5173:
   ```
   npm run dev
   ```
5. To make a production build and check it locally:
   ```
   npm run build
   npm run preview
   ```

## Database setup

The whole database is in two SQL files. `supabase/schema.sql` makes the tables, the RLS policies, the triggers and the functions, and `supabase/seed.sql` adds the products. I run them in the Supabase SQL Editor instead of making the tables by hand, so the database is in git together with the code.

**Warning:** schema.sql starts with `drop table` and deletes the tables with all their data (products, reviews, favorites, orders, profiles). Run it only on a new, empty project.

1. Create a new Supabase project and put its URL and publishable key in `.env` (see [Getting started](#getting-started)).
2. In Authentication → Sign In / Providers → Email, turn off "Confirm email", so a new user is logged in right after Register.
3. In Authentication → Users, add a user with the email admin.tour@gmail.com and a password of your choice. seed.sql looks for this user and stops with an error if it doesn't exist.
4. In the SQL Editor, run the whole `supabase/schema.sql`.
5. Then run `supabase/seed.sql`. It gives admin.tour@gmail.com the admin role, sets its username to "Tourashop Admin" and adds 32 products, 8 in each category. The product photos are in `public/assets/images`.

## Project structure

```
public/assets/   photos, fonts and the template's CSS (Bootstrap, Font Awesome, main.css)
src/
  assets/        the Tourashop logos
  components/    reusable parts, each in its own folder with its CSS module
  contexts/      AuthContext and FavoritesContext with their Providers
  data/          fixed site content (categories, social links, team, Instagram posts)
  hooks/         custom hooks (useAsync, useForm, useAuth, useFavorites, useHeaderScroll, useScrollToHash)
  lib/           the Supabase client
  pages/         one folder per page, with its CSS module
  services/      all requests to Supabase (auth, products, reviews, favorites)
  utils/         small helpers (prices, dates, rating, pagination, error messages)
supabase/        schema.sql and seed.sql
```

Components and pages never call Supabase directly. They use the functions in `services/`, so all requests are in one place. The products are not in `data/`, they all come from Supabase.

The design is based on the free TemplateMo 571 Hexashop template, which I redesigned with my own theme.

## Functional Guide

### 1. Project Overview

Application Name: Tourashop

Application Category / Topic: E-commerce Site

Main Purpose: Tourashop is an online shop for outdoor gear for hiking, running, biking and climbing. Guests can browse the catalog by activity and open the details of each product. After they register, users can rate and review products and save them to their favorites.

### 2. User Access & Permissions

#### Guest (Not Authenticated)

- Available pages / routes: Home (`/`), About (`/about`), Contact (`/contact`), Catalog (`/catalog` and `/catalog/:category`), Product Details (`/products/:productId/details`), Login (`/login`) and Register (`/register`). If a guest opens Favorites (`/favorites`), they go to Login first.
- Public data shown: all products with their photo, name, price, description and average rating, and the reviews under each product with the username, stars, date and text. A guest can't write a review or add favorites. Under the Reviews heading there is a "Log in to write a review" button, and the heart on a product leads to Login with the note "You need an account to add products to your favorites." After login the user comes back to the same page.

#### Authenticated User

- Main sections / pages: the same pages as a guest, plus Favorites (`/favorites`) with the products they saved. Login and Register are hidden from them, and if they open `/login` they go to Home. The Account menu has Favorites, My Orders and Logout.
- Details pages: on Product Details the user can add the product to favorites with the heart on the photo and write a review under it.
- Create / Edit / Delete actions: write a review with stars and text (one per product), edit their own review and delete it after a confirm window. They can't edit or delete other people's reviews. They add and remove favorites with the heart on the product cards and on Product Details.

The My Orders, Cart and Admin Panel (admin only) links are for planned pages and open Not Found for now, and the Add To Cart buttons don't do anything yet (see [Roadmap](#roadmap--not-built-yet)).

### 3. Authentication & Session Handling

#### Authentication Flow

- What happens when the app loads: The whole app is wrapped in `AuthProvider`. When it mounts, it starts listening to Supabase with `onAuthStateChange`. Supabase answers right away with an `INITIAL_SESSION` event. If the user has logged in before, the event brings their session. If not, it comes empty and the user is a guest.
- How authentication status is checked: AuthProvider saves the user from the session in its state and passes it to the rest of the app through `AuthContext`. Any component can check if someone is logged in with the `useAuth()` hook. Until Supabase answers the first time, the app doesn't know if the user is logged in, so the guards show a loader instead of redirecting. That is why a refresh on the Favorites page doesn't send a logged-in user to Login.
- What happens on successful login or registration: Login sends the email and password to Supabase. Register sends the username, email and password, and a trigger in the database creates a profile with the username. I turned off "Confirm email" in Supabase, so the user doesn't have to open their email and is logged in right after Register. Supabase sends a `SIGNED_IN` event, AuthProvider saves the user and the app goes to Home. If the user came to Login from a product page, for example to write a review, they go back to that product.
- What happens on logout: The user clicks Logout in the Account menu. The app goes to Home first and then logs out in Supabase. Supabase deletes the session and sends `SIGNED_OUT`, AuthProvider clears the user and the menu shows Login and Register again. I go to Home first because of the Favorites page. If the user logs out there, its guard would send them to Login.

#### Session Persistence

- How is the user session stored? The logged-in user is kept in `AuthContext`, so every component can read it. The session itself (the login token) is saved by supabase-js in localStorage. I kept this default instead of sessionStorage, so the user stays logged in in a new tab and after closing the browser, and logging out in one tab logs out the other tabs too. sessionStorage would not be safer, because scripts on the page can read both. What protects the data is RLS in the database (see section 6).
- How is automatic login handled after a page refresh? After a refresh, supabase-js finds the session in localStorage, and `onAuthStateChange` sends it with `INITIAL_SESSION`. AuthProvider saves the user again and they stay logged in. Supabase also renews the token by itself before it expires, so my code doesn't do that.

### 4. Routing Structure

#### Route Guards Logic

- How is routing split between guest-only and private routes? I have two guards in `src/components/guards/`. In `App.jsx` they wrap the routes they protect. A guard doesn't show anything of its own: it either shows the page through `<Outlet />` or redirects. `GuestGuard` wraps Login and Register, so a logged-in user who opens them goes to Home. `PrivateGuard` wraps Favorites, so a guest who opens it goes to Login and comes back to Favorites after logging in. While the first session check is running, both guards show a loader, so they don't redirect too early. All other pages are public.

#### Main Routes

- Number and type of top-level pages: 9 pages. Five are public: Home, About, Contact, Catalog and Product Details. Two are only for guests: Login and Register. One is private: Favorites. The last one is Not Found, which shows for any other address (`*`). Home, Catalog, Product Details and Favorites load their data from Supabase.

#### Nested & Parameterized Routes

- Is there nested routing? Yes. All routes are inside one layout route with the `Layout` component. It shows the Header and the Footer, and the current page goes in the `<Outlet />` between them. The guards are nested inside it too. Layout also scrolls to the top when the page changes.
- Which routes use URL parameters? `/catalog/:category` and `/products/:productId/details`. Catalog reads the category with `useParams` and shows only hiking, running, biking or climbing products. Product Details reads the product id and loads that product. An unknown category or product id shows Not Found. Catalog also keeps the page number in the URL (`?page=2`), so a refresh stays on the same page.

### 5. List → Details Flow

#### Catalog / List Page

- What data is displayed? The Catalog (`/catalog`) shows the products from Supabase as cards with the photo, name, price and average rating. `/catalog/hiking` and the other categories show only the products of that category. They come in one request, and the page shows 9 of them at a time, with pagination above and below the grid. The same cards are used in the four carousels on Home (one per category) and on the Favorites page.
- How does the user interact with the list (filter / sort / search)? The user filters by category with the dropdown above the grid. Choosing a category changes the URL with `useNavigate`, so each category has its own address and its products are loaded from Supabase. The "Discover More" buttons on Home and the category links in the footer open the same filtered pages. There is no sort or search.

#### Details Page

- How is navigation triggered (Link / useNavigate)? Each product card has an eye icon that shows when the mouse is over the photo. It is a `<Link>` to `/products/:productId/details`. The card is the same on Home, Catalog and Favorites, so the details open the same way from all three.
- What data is received via route parameters? Only the product id. Product Details reads it with `useParams` and uses it for two requests: the product (name, price, photo and description) and its reviews. If the id is not a number, the page shows Not Found without sending a request. If no product has this id, Supabase returns nothing and the page shows Not Found too. On the page the user can change the quantity and see the total price. The quote "Tested by our team on the trails around Boulder before it reaches the shelf." is the same on every product. It is the shop's own text in the page, not product data.

### 6. Data Source & Backend

#### Backend Type

- Real backend: Supabase, used through the supabase-js SDK. It gives me a PostgreSQL database, authentication and a REST API for the tables, so I didn't write my own server. All requests are in `src/services/`.

The tables are `profiles` (the username), `products`, `reviews` and `favorites`. There is also an `orders` table for the planned My Orders page, which the app doesn't use yet.

The rules for who can do what are in the database with Row Level Security (RLS), not only in the UI:

- Everyone can read the products, the usernames and the reviews.
- Only the author can edit or delete a review.
- A user sees and changes only their own favorites.
- Only an admin can create products, and edit or delete the ones they created. There is no Admin Panel yet, so for now this is only in the database.
- A guest can't write anything.

When a user adds a review or a favorite, the database takes the user id from the login token, so nobody can write a review in someone else's name.
<!-- TODO: add the keep-alive at the deploy and describe it here -->

### 7. Data Operations (CRUD)

Reviews are the collection where a regular user can do all four operations. Anyone can read them, but only logged-in users can write one, and only the author can change or delete it.

#### Create (POST)

- How does the user create new data? Under each product there is a Reviews part. When the user is logged in, they see a small form there. They pick from 1 to 5 stars, write what they think and click "Post Review". The review is saved in the `reviews` table in Supabase. Each user can review a product only once, so after posting, the form goes away and their own review shows in its place.

#### Read (GET)

- Where is data fetched and displayed? When Product Details opens, it loads the reviews of that product, newest first, with the name of each author. They show as cards under the product. At first there are 4, and "Show more reviews" adds 4 more. From the same reviews I count the average rating, which shows next to the product name, for example "4.5 (2 reviews)". The product cards show it as stars too. Guests can see all of this as well.

#### Update (PUT/PATCH)

- How does the author edit an existing record? On their own review the author sees a small pencil icon. It opens the same form with their stars and text already filled in. They change what they want and click "Save Changes", or Cancel to leave it as it was. After the change, the date shows "Edited". Other users don't see the pencil, and even if someone sends the request another way, the database doesn't let them change a review that isn't theirs.
- How is the UI updated after the change? After saving, the reviews are loaded again, so the new text and the new average show at once, without reloading the page. The old list stays on the screen until the new one arrives, so nothing blinks.

#### Delete

- How does the author delete an existing record? Next to the pencil there is a trash icon. It doesn't delete right away. First it opens a confirm window (my `ConfirmModal` component) that asks "Delete review?" with the text "This can't be undone." and the buttons Cancel and Delete. Like the pencil, only the author has this icon, and the database refuses a delete from anyone else.
- How is the UI updated after the change? After deleting, the reviews are loaded again. The review is gone from the list, the window closes, the average changes and the empty form comes back, so the user can write a new review if they want. The page doesn't reload.

Besides reviews, logged-in users can save products with the heart icon. One click adds the product to their favorites, another click removes it, and the heart is red while the product is saved. Reviews and favorites both go to Supabase through the API, and only logged-in users can use them. A guest can read the reviews, but can't write one or save a favorite.

### 8. Forms & Validation

#### Forms Used

All forms are controlled. What the user types is kept in React state through my `useForm` hook, and `onSubmit` handles the form without reloading the page.

- Login (`/login`): email and password.
- Register (`/register`): username, email, password and repeat password.
- Review form on Product Details: stars and text. The same form is used to write and to edit a review.
- Contact (`/contact`): name, email and message.
- Subscribe on Home: name and email.

Contact and Subscribe only show a thank-you message for now. They don't send or save anything yet.

#### Validation Rules

- Field name and rules: Email (Login, Register, Contact, Subscribe). It is required and must be a valid email address. The browser shows its own message and doesn't send the form until it is right.
- Field name and rules: Review stars. The user must choose from 1 to 5 stars. If they don't, the form shows "Please rate our product." under the stars and sends nothing.
- Field name and rules: Review text. It is required, text with only spaces counts as empty, and it can be up to 1000 characters. If it is empty, the form shows "Please write your review." The messages go away as soon as the user fixes the field. The database also checks the 1 to 5 stars and the 1000 characters.
- Field name with multiple validation rules: Password on Register. It is required, it must be at least 6 characters, and it must match Repeat Password. The browser checks the first two. My code checks the match before anything is sent, and if the passwords are different, the form shows "Passwords don't match."

### 9. React-Specific Techniques

#### Hooks & Component Lifecycle

- Which hooks are used, and where?
  - `useState` is the one I use most. Every form, menu and confirm window keeps its own state with it, and so does the quantity on Product Details.
  - `useEffect` is for things that start when a component appears and stop when it goes away: listening for login and logout in AuthProvider, loading data, the header's scroll listener and the preloader timer.
  - `useRef` lets me scroll to a section and open the delete window.
  - `use` reads the two contexts.
  - `useEffectEvent`: FavoritesProvider reloads the hearts when the user comes back to the tab. With `useEffectEvent` the listener is added once after login, but it still calls the newest reload function.
  - From React Router I use `useParams` for the category and the product id, `useSearchParams` for the page number, and `useNavigate` and `useLocation` to move between pages.

  I also wrote my own hooks, so the same code isn't repeated on every page:
  - `useAsync` loads data from Supabase and tells the page if it is still loading or got an error. The products, the reviews, the profile and the favorites all load with it.
  - `useForm` keeps what the user types in a form.
  - `useAuth` and `useFavorites` are short ways to read the two contexts.
  - `useHeaderScroll` makes the header stick to the top and marks the section in view on Home.
  - `useScrollToHash` scrolls Home to a section when the link is like `/#hiking`.
- Give one example of mount / update / unmount behavior in your app. The Catalog page loads its products with `useAsync`, and the effect depends on the category in the URL.
  1. Mount: the user opens `/catalog/hiking`. The effect runs and asks Supabase for the hiking products. Until they come, the page shows a loader.
  2. Update: the user picks Running in the dropdown. The category changes, so the effect runs again and asks for the running products. If the hiking request hasn't finished yet, the cleanup cancels it first, so old products can't show up on the wrong page.
  3. Unmount: the user leaves the Catalog. The cleanup cancels the request if it is still running, and its answer is ignored.

#### Context API

- What state/data is shared through Context, and which components consume it? I have two contexts, because many parts of the app need the same information.

  `AuthContext` knows who is logged in and if they are an admin, and it has the login, register and logout functions. The header and the footer use it to show the right menu, the guards to decide where the user can go, Login and Register to log the user in, and the reviews to know who can write, edit or delete.

  `FavoritesContext` keeps the ids of the user's favorite products and the function that adds or removes one. It loads them once after login, so the hearts on the cards don't each need their own request, and again when the user comes back to the tab. The heart buttons and the Favorites page use it. The Favorites page loads the products for these ids in one request.

  The red strip under the header (`AppAlerts`) reads both contexts, because it shows an error when the profile or the favorites can't load.

#### Component Styling

- How are components styled? Every component and page has its own CSS Module file next to it, so the class names of one component can't break another. The things the whole site shares are in `public/assets/css/main.css`: the colors, the fonts and the buttons. The grid comes from Bootstrap 4, which the template already used, and the icons are from Font Awesome. I replaced the template's look with my own theme, like a day from sunrise to sunset: each section on Home is a little darker than the one above it, with a mountain ridge between them.

### 10. Typical User Flow

1. A new visitor opens Home, looks through the carousels and clicks "Shop Now". The Catalog shows all the gear, 9 products per page. They move to the second page, then choose Hiking in the dropdown, and only the hiking gear is left.
2. They open a product with the eye icon and read its description and reviews. They click the heart to save it, but as a guest they go to Login with the note "You need an account to add products to your favorites." They don't have an account, so they click Register, fill in the form and come back to the same product, now logged in.
3. They click the heart again and it turns red. Then they give the product 4 stars and write a review. Their review shows first in the list, and the average rating next to the product name changes right away.
4. Later they decide to change the rating, so they click the pencil, choose 5 stars and save, and the review shows "Edited". They open Favorites from the Account menu, see the saved product there and log out.

### 11. Error & Edge Case Handling

- Authentication errors: If login or register fails, a red line above the button says what went wrong. It shows the message from Supabase, for example "Invalid login credentials" or "User already registered". If the server can't be reached, it says "Could not reach the server. Please try again." What the user typed stays in the form, so they only fix the wrong part. While the request runs, the button says "Please wait..." and can't be clicked again. If the user's profile can't load after login, a red strip under the header says "We couldn't load your account. Please refresh the page."
- Network or data errors: Every page that loads data shows a loader first. If the request fails, the page shows "Something went wrong while loading. Please try again later." instead of breaking. If saving a review fails, the form shows "Could not save your review. Please try again." and the text they wrote stays. If deleting fails, the confirm window stays open and shows "Could not delete your review. Please try again." If the review was already deleted in another tab, the message is "Something went wrong. Please refresh the page." If the heart can't save, a red strip under the header says "Could not update your favorites. Please try again." and the heart stays as it was. If only the reviews fail to load, the rating next to the product name says "Rating unavailable", because "No ratings yet" would not be true.
- Empty or missing data states: An empty category shows "No items in this category". Under a product without reviews a guest sees "No reviews yet", and the rating says "No ratings yet". An empty Favorites page shows "No favorites yet" with a "Browse the Catalog" button. A wrong address shows the 404 page "Looks like this trail doesn't exist." with a button back to Home. This works for any unknown URL, and also for a wrong category like `/catalog/foo`, a product id that isn't a number like `/products/abc/details` (no request is sent), and a product that doesn't exist like `/products/999/details`.

## Roadmap / Not built yet

These parts are planned. Their links and buttons are already in the app, but for now they open Not Found or do nothing.

- Cart and Add To Cart: the user puts products in a cart, changes the quantities and places an order.
- My Orders: the user sees their orders and can cancel one while it is still pending.
- Admin Panel: the admin creates, edits and deletes products.
- Review moderation: the admin can hide a review and write the reason, which only the author and the admins can see.
- Contact and Subscribe: the forms really send the message and save the email.

## Development log

### Steps to set up the project
    - [x] Install vite react project "npm create vite@latest"
    - [x] Clean up the project
    - [x] Add assets to public folder
    - [x] Add transferred html->jsx to App component
    - [x] Add index.html header links and scripts

### Steps to extract reusable components
    - [x] Extract components
    - [x] Clean up App.jsx by extracting home page sections into Home Page Component
    - [x] Extract Hero Card as reusable component
    - [x] Extract New Arrivals Product as reusable component
    - [x] Merge New Arrivals, Best Sellers, Special Offers into reusable Carousel Section component - pass id, title and products array as props
    - [x] Move product data out of the components into src/data/products.js
    - [x] Rename NewArrivalsProducts to ProductCard as reusable for all carousels
    - [x] Add subtitle as a prop into CarouselSection component to replace the hardcoded data
    - [x] Extract Section heading as reusable component (CarouselSection, SubscribeSection,CommunitySection)
    - [x] Extract Pagination as reusable component

### Steps to add the Swiper carousel
    - [x] Install swiper for carousel "npm install swiper"
    - [x] Add Swiper carousel to NewArrivals - import Swiper, SwiperSlide, Navigation and wrap each product in SwiperSlide
    - [x] Replace the id-scoped CSS (#men, #women, #kids) with a single reusable .product-carousel class to apply for all carousel sections.
    - [x] Restyle the default Swiper arrows to match the template design

### Steps to brand and design the UI
    - [x] Rename sections to activities (hiking, running, biking) and add a fourth one (climbing)
    - [x] Update header navigation - point the anchors to the new section ids and rename the link labels
    - [x] Replace the Explore section text with suitable store content
    - [x] Replace Subscribe section text and fix the form validation (required, type="email")
    - [x] Rebrand to Tourashop - add SVG logos (src/assets/logo.svg, logo-white.svg) to Header and Footer, replace the footer contacts, category links and social icons
    - [x] Add eyebrow as an optional prop to SectionHeading - small uppercase label above the heading, used in Hero, Carousel, Explore, Community and Subscribe sections
    - [x] Define the Tourashop palette as CSS variables in main.css (graphite, teal, sky, alpenglow) and replace the hardcoded template colors
    - [x] Add a mountain ridge on top of the footer in the logo colors
    - [x] Build a sunrise-to-sunset page background - each home section is a step darker (white, cream, sage, blue) with a pale ridge between sections, closing with the Subscribe sunset gradient and the footer ridge
    - [x] Style the header as a sunrise gradient with the hero rising into it as a ridge
    - [x] Replace photos with outdoor images that match each product, the hero banner and cards, and the Explore and Instagram sections
    - [x] Darken the teal on buttons, prices, stars and menu links for better contrast
    - [x] Move the template styles from main.css into CSS modules next to each component and page

### Steps to add navigation behavior in React
    - [x] Make the header sticky - using useEffect scroll listener
    - [x] Add smooth scroll for nav links
    - [x] Clicked nav link become active. Active section goes in Header state.
    - [x] Highlight the nav link of the section in view while scrolling
    - [x] Toggle the mobile menu with the .menu-trigger button
    - [x] Close the mobile menu after a section link is clicked
    - [x] Make Pages and Features submenus self closing on mobile version
    - [x] Turn Pages and Features into buttons
    - [x] Open the desktop submenus from the keyboard too

### Steps to add routing with React Router
    - [x] Install React Router "npm install react-router"
    - [x] Move HomePage to pages and add a Layout
    - [x] Wrap the app in BrowserRouter and add the first routes
    - [x] Scroll to the top when the page changes
    - [x] Replace the <a> links with Link, and with NavLink in the header menus to mark the open page
    - [x] Make the section links work from every page - link to /#hiking and scroll to the section with useRef on Home

### Steps to add the pages from the template
    - [x] Add the About, Contact and Not Found pages
    - [x] Add the Catalog page
        - [x] Show the products - 9 per page
        - [x] Filter by category
    - [x] Add the Product Details page
        - [x] Show product details dynamically
        - [x] Change quantity and see total price 

### Steps to connect the Supabase backend
    - [x] Create the Supabase project
    - [x] Install the Supabase client "npm install @supabase/supabase-js"
    - [x] Add .env.example, .env and add .env to .gitignore
    - [x] Add the Supabase client
    - [x] Add the schema and seed data
    - [x] Read the products from Supabase in Home and Catalog
    - [x] Filter products by category in Supabase
    - [x] Show loader, error when loading and an empty message

### Steps to manage the forms
    - [x] Make the Contact and Subscribe forms controlled
    - [x] Extract the form logic into a useForm hook
    - [x] Make the Login and Register forms controlled

### Steps to add authentication
    - [x] Add Login and Register pages and routes
    - [x] Add register and login functionalities
    - [x] Show the Account menu by role and log out

### Steps to protect the routes
    - [x] Hide Login and Register routes from logged-in users
    - [x] Hide the Favorites page from guests

### Steps to add reviews
    - [x] Show reviews under each product
    - [x] Write a review under a product
    - [x] Edit your own review
    - [x] Show when a review was edited
    - [x] Delete review
    - [x] Show more or fewer reviews
    - [x] Show the average rating on the product page
    - [x] Show the average rating on product cards

### Steps to add favorites
    - [x] Add products to favorites with the heart
    - [x] Redirect guest to Login to add favorites
    - [x] Show favorite products on their page
    - [x] Add to favorites from the details page
