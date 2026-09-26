import CarouselSection from "./CarouselSection"
import ExploreSection from "./ExploreSection"
import SocialSection from "./SocialSection"
import SubscribeSection from "./SubscribeSection"
import HeroSection from "./HeroSection"
import { hikingProducts, runningProducts, bikingProducts, climbingProducts } from "../data/products"

export default function HomePage() {
    return (
        <>
            <HeroSection />

            <CarouselSection id="hiking" title="Hiking's Latest" products={hikingProducts} />

            <CarouselSection id="running" title="Running's Latest" products={runningProducts} />

            <CarouselSection id="biking" title="Biking's Latest" products={bikingProducts} />

            <CarouselSection id="climbing" title="Climbing's Latest" products={climbingProducts} />

            <ExploreSection />

            <SocialSection />

            <SubscribeSection />
        </>
    );
}
