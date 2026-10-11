import { useEffect, useRef } from "react"
import { useLocation } from "react-router"
import CarouselSection from "../../components/carousel-section/CarouselSection"
import ExploreSection from "../../components/explore-section/ExploreSection"
import CommunitySection from "../../components/community-section/CommunitySection"
import SubscribeSection from "../../components/subscribe-section/SubscribeSection"
import HeroSection from "../../components/hero-section/HeroSection"
import { getProducts } from "../../services/productService"
import useAsync from "../../hooks/useAsync"

export default function Home() {
    const { hash, key } = useLocation();
    const topRef = useRef(null);
    const hikingRef = useRef(null);
    const runningRef = useRef(null);
    const bikingRef = useRef(null);
    const climbingRef = useRef(null);
    const exploreRef = useRef(null);
    const hiking = useAsync((signal) => getProducts("hiking", signal));
    const running = useAsync((signal) => getProducts("running", signal));
    const biking = useAsync((signal) => getProducts("biking", signal));
    const climbing = useAsync((signal) => getProducts("climbing", signal));
    const loading = hiking.loading || running.loading || biking.loading || climbing.loading;

    useEffect(() => {
        if (loading) {
            return;
        }

        const sections = {
            "#top": topRef,
            "#hiking": hikingRef,
            "#running": runningRef,
            "#biking": bikingRef,
            "#climbing": climbingRef,
            "#explore": exploreRef,
        };
        const section = sections[hash]?.current;

        if (!section) return;

        const images = [...document.images].map((image) => image.decode());

        Promise.allSettled(images)
            .then(() => section.scrollIntoView({ behavior: "smooth" }));
    }, [hash, key, loading]);

    return (
        <>
            <HeroSection ref={topRef} />

            <CarouselSection
                ref={hikingRef}
                id="hiking"
                tier={1}
                title="Hiking's Latest"
                subtitle="Boots, poles and shells built for long days on the trail."
                products={hiking.data}
                loading={hiking.loading}
                error={hiking.error}
            />

            <CarouselSection
                ref={runningRef}
                id="running"
                tier={2}
                mirrored
                title="Running's Latest"
                subtitle="Lightweight kit that keeps up, from morning miles to race day."
                products={running.data}
                loading={running.loading}
                error={running.error}
            />

            <CarouselSection
                ref={bikingRef}
                id="biking"
                tier={3}
                title="Biking's Latest"
                subtitle="Helmets, bibs and bags for the commute and the climb."
                products={biking.data}
                loading={biking.loading}
                error={biking.error}
            />

            <CarouselSection
                ref={climbingRef}
                id="climbing"
                tier={4}
                mirrored
                title="Climbing's Latest"
                subtitle="Harnesses, shoes and chalk you can put your weight on."
                products={climbing.data}
                loading={climbing.loading}
                error={climbing.error}
            />

            <ExploreSection ref={exploreRef} />

            <CommunitySection />

            <SubscribeSection />
        </>
    );
}
