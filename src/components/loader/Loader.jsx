import styles from "./Loader.module.css";

export default function Loader() {
    return (
        <div className={styles.loader} role="status" aria-label="Loading">
            <div className={styles.jumper}>
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}
