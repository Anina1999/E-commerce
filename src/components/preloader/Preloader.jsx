import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

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
        <div className={fading ? `${styles.preloader} ${styles.fading}` : styles.preloader}>
            <div className={styles.jumper}>
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}