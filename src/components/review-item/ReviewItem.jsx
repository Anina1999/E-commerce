import { formatDate } from "../../utils/formatDate";
import styles from "./ReviewItem.module.css";

export default function ReviewItem({ review }) {
    return (
        <li className={styles.reviewItem}>
            <div className={styles.header}>
                <h6>{review.profiles.username}</h6>
                <ul className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <li key={star}>
                            <i className={star <= review.rating ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
                        </li>
                    ))}
                </ul>
            </div>
            <span className={styles.date}>{formatDate(review.created_at)}</span>
            <p>{review.content}</p>
        </li>
    );
}
