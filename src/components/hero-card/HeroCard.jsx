import styles from "./HeroCard.module.css";

export default function HeroCard({activity, activityBestItems, itemsText, activityImage}) {
    return (
        <div className="col-lg-6">
            <div className={styles.card}>
                <div className={styles.thumb}>
                    <div className={styles.innerContent}>
                        <h4>{activity}</h4>
                        <span>{activityBestItems}</span>
                    </div>
                    <div className={styles.hoverContent}>
                        <div className={styles.inner}>
                            <h4>{activity}</h4>
                            <p>
                                {itemsText}
                            </p>
                            <div className="main-border-button">
                                <a href={`#${activity.toLowerCase()}`}>Discover More</a>
                            </div>
                        </div>
                    </div>
                    <img src={activityImage} alt={activity} />
                </div>
            </div>
        </div>
    );
}