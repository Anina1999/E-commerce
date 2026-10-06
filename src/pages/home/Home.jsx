import CarouselSection from "../../components/carousel-section/CarouselSection"
import ExploreSection from "../../components/explore-section/ExploreSection"
import CommunitySection from "../../components/community-section/CommunitySection"
import SubscribeSection from "../../components/subscribe-section/SubscribeSection"
import HeroSection from "../../components/hero-section/HeroSection"
import { hikingProducts, runningProducts, bikingProducts, climbingProducts } from "../../data/products"

export default function Home() {
    return (
        <>
            <HeroSection />

            <CarouselSection 
                id="hiking"
                tier={1}
                title="Hiking's Latest" 
                subtitle="Boots, poles and shells built for long days on the trail."
                products={hikingProducts}
            />

            <CarouselSection 
                id="running"
                tier={2}
                mirrored
                title="Running's Latest"
                subtitle="Lightweight kit that keeps up, from morning miles to race day." 
                products={runningProducts}
            />

            <CarouselSection 
                id="biking"
                tier={3}
                title="Biking's Latest" 
                subtitle="Helmets, bibs and bags for the commute and the climb."
                products={bikingProducts}
            />

            <CarouselSection 
                id="climbing"
                tier={4}
                mirrored
                title="Climbing's Latest" 
                subtitle="Harnesses, shoes and chalk you can put your weight on."
                products={climbingProducts}  
            />

            <ExploreSection />

            <CommunitySection />

            <SubscribeSection />
        </>
    );
}
