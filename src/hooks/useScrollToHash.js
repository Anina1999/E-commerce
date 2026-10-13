import { useEffect } from "react";
import { useLocation } from "react-router";

export default function useScrollToHash(sections, ready) {
    const { hash, key } = useLocation();

    useEffect(() => {
        if (!ready) return;

        const section = sections[hash]?.current;
        if (!section) return;

        const images = [...document.images].map((image) => image.decode());

        Promise.allSettled(images)
            .then(() => section.scrollIntoView({ behavior: "smooth" }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash, key, ready]);
}
