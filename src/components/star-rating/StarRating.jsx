import styles from "./StarRating.module.css";

export default function StarRating({ rating, variant, className }) {
    const rootClassName = [styles.starRating, styles[variant], className].filter(Boolean).join(" ");
    const rounded = Math.floor(rating * 2) / 2;
    const label = rating ? `Rated ${Math.round(rating * 10) / 10} out of 5` : "No ratings yet";

    const getStarClass = (star) => {
        if (star <= rounded) {
            return "fa fa-star";
        }

        if (star - 0.5 === rounded) {
            return "fa fa-star-half-o";
        }

        return "fa fa-star-o";
    };

    return (
        <ul className={rootClassName} aria-label={label}>
            {[1, 2, 3, 4, 5].map((star) => (
                <li key={star}>
                    <i className={getStarClass(star)} aria-hidden="true" />
                </li>
            ))}
        </ul>
    );
}
