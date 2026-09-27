# React e-commerce project

## Steps to set up the project
    - [x] Install vite react project "npm create vite@latest"
    - [x] Clean up the project
    - [x] Add assets to public folder
    - [x] Add transferred html->jsx to App component
    - [x] Add index.html header links and scripts

## Steps to extract reusable components
    - [x] Extract components
    - [x] Clean up App.jsx by extracting home page sections into Home Page Component
    - [x] Extract Hero Card as reusable component
    - [x] Extract New Arrivals Product as reusable component
    - [x] Merge New Arrivals, Best Sellers, Special Offers into reusable Carousel Section component - pass id, title and products array as props
    - [x] Move product data out of the components into src/data/products.js
    - [x] Rename NewArrivalsProducts to ProductCard as reusable for all carousels
    - [x] Add subtitle as a prop into CarouselSection component to replace the hardcoded data
    - [x] Extract Section heading as reusable component (CarouselSection, SubscribeSection,CommunitySection)

## Steps to add the Swiper carousel
    - [x] Install swiper for carousel "npm install swiper"
    - [x] Add Swiper carousel to NewArrivals - import Swiper, SwiperSlide, Navigation and wrap each product in SwiperSlide
    - [x] Replace the id-scoped CSS (#men, #women, #kids) with a single reusable .product-carousel class to apply for all carousel sections.
    - [x] Restyle the default Swiper arrows to match the template design

## Steps to brand and design the UI
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

## Steps to add navigation behavior in React
    - [x] Make the header sticky - using useEffect scroll listener
    - [x] Add smooth scroll for nav links
    - [x] Clicked nav link become active. Active section goes in Header state.
    - [x] Highlight the nav link of the section in view while scrolling
    - [x] Toggle the mobile menu with the .menu-trigger button
    - [x] Close the mobile menu after a section link is clicked