import NewArrivals from "./NewArrivals"
import BestSellers from "./BestSellers"
import SpecialOffers from "./SpecialOffers"
import ExploreSection from "./ExploreSection"
import SocialSection from "./SocialSection"
import SubscribeSection from "./SubscribeSection"
import HeroSection from "./HeroSection"

export default function HomePage() {
    return (
        <>
            <HeroSection />

            <NewArrivals />

            <BestSellers />

            <SpecialOffers />

            <ExploreSection />

            <SocialSection />

            <SubscribeSection />
        </>
    );
}