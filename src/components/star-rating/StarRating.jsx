import styles from "./StarRating.module.css";

export default function StarRating({ rating, className }) {
    const rootClassName = [styles.starRating, className].filter(Boolean).join(" ");

    return (
        <ul className={rootClassName} aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <li key={star}>
                    <i className={star <= rating ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
                </li>
            ))}
        </ul>
    );
}
