# React e-commerce project

## Steps to initialize, organize and set UI 
    - [x] Install vite react project "npm create vite@latest"
    - [x] Clean up the project
    - [x] Add assets to public folder
    - [x] Add transferred html->jsx to App component
    - [x] Add index.html header links and scripts
    - [x] Extract components
    - [x] Clean up App.jsx by extracting home page sections into Home Page Component
    - [x] Extract Hero Card as reusable component
    - [x] Extract New Arrivals Product as reusable component
    - [x] Install swiper for carousel "npm install swiper"
    - [x] Add Swiper carousel to NewArrivals - import Swiper, SwiperSlide, Navigation and wrap each product in SwiperSlide
    - [x] Merge New Arrivals, Best Sellers, Special Offers into reusable Carousel Section component - pass id, title and products array as props
    - [x] Move product data out of the components into src/data/products.js
    - [x] Rename sections to activities (hiking, running, biking) and add a fourth one (climbing)
    - [x] Replace the id-scoped CSS (#men, #women, #kids) with a single reusable .product-carousel class to apply for all carousel sections.
    - [x] Update header navigation - point the anchors to the new section ids and rename the link labels
    - [x] Restyle the default Swiper arrows to match the template design
    - [x] Rename NewArrivalsProducts to ProductCard as reusable for all carousels
    - [x] Add subtitle as a prop into CarouselSection component to replace the hardcoded data