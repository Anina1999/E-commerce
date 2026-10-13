import { useEffect, useState } from "react";

export default function useHeaderScroll(sectionIds, isHome) {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("top");

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);

            if (!isHome) {
                setActiveSection(null);
                return;
            }

            const current = sectionIds.findLast((id) => {
                const section = document.getElementById(id);
                return section && section.getBoundingClientRect().top <= 81;
            });

            if (current) setActiveSection(current);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionIds, isHome]);

    return {
        isSticky,
        activeSection,
        setActiveSection,
    };
}
