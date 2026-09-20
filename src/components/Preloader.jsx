import { useEffect, useState } from "react";

export default function Preloader() {
    const [fading, setFading] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFading(true), 300);
        const hideTimer = setTimeout(() => setVisible(false), 900);

        const clearTimeoutsHandler = () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        }

        return clearTimeoutsHandler;
    }, []);

    if (!visible) return null;

    return (
        <div id="preloader"
            style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.6s ease",
                pointerEvents: fading ? "none" : "auto",
            }}
        >

            <div className="jumper">
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}