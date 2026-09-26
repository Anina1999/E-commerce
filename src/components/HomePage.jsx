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

            <CarouselSection 
                id="hiking" 
                title="Hiking's Latest" 
                subtitle="Boots, poles and shells built for long days on the trail."
                products={hikingProducts}
            />

            <CarouselSection 
                id="running" 
                title="Running's Latest"
                subtitle="Lightweight kit that keeps up, from morning miles to race day." 
                products={runningProducts}
            />

            <CarouselSection 
                id="biking" 
                title="Biking's Latest" 
                subtitle="Helmets, bibs and bags for the commute and the climb."
                products={bikingProducts}
            />

            <CarouselSection 
                id="climbing" 
                title="Climbing's Latest" 
                subtitle="Harnesses, shoes and chalk you can put your weight on."
                products={climbingProducts}  
            />

            <ExploreSection />

            <SocialSection />

            <SubscribeSection />
        </>
    );
}
