import BestSellers from "./components/BestSellers"
import ExploreSection from "./components/ExploreSection"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import NewArrivals from "./components/NewArrivals"
import Preloader from "./components/Preloader"
import SocialSection from "./components/SocialSection"
import SpecialOffers from "./components/SpecialOffers"
import SubscribeSection from "./components/SubscribeSection"

function App() {
  return (
    <>
      <Preloader />

      <Header />

      <HeroSection />
      
      <NewArrivals />

      <BestSellers />

      <SpecialOffers />
      
      <ExploreSection />

      <SocialSection />

      <SubscribeSection />

      <Footer />
    </>
  )
}

export default App
