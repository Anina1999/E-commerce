import styles from "./InstagramCard.module.css";

export default function InstagramCard({
    title,
    image,
    link
}) {
    return (
        <div className="col-3 px-0">
            <div className={styles.thumb}>
                <div className={styles.icon}>
                    <a href={link}>
                        <h6>{title}</h6>
                        <i className="fa fa-instagram" />
                    </a>
                </div>
                <img src={image} alt={title} />
            </div>
        </div>
    );
}
