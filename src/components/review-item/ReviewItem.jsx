import { useState } from "react";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import { deleteReview } from "../../services/reviewService";
import { formatDate } from "../../utils/formatDate";
import { getDeleteErrorMessage } from "../../utils/reviewErrorMessage";
import styles from "./ReviewItem.module.css";

export default function ReviewItem({ review, isOwn, onEdit, refreshReviews }) {
    const [confirming, setConfirming] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const isEdited = review.updated_at !== review.created_at;

    const deleteHandler = async () => {
        setError("");
        setPending(true);

        try {
            await deleteReview(review.id);
            await refreshReviews();
        } catch (err) {
            setError(getDeleteErrorMessage(err));
            setPending(false);
        }
    };

    const closeHandler = () => {
        setConfirming(false);
        setError("");
    };

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
            <span className={styles.date}>
                {formatDate(review.created_at)}
                {isEdited && " · Edited"}
            </span>
            <p className={styles.text}>{review.content}</p>
            {isOwn && (
                <div className={styles.actions}>
                    {!review.is_hidden && (
                        <button type="button" className={styles.edit} onClick={onEdit}>Edit</button>
                    )}
                    <button type="button" className={styles.delete} onClick={() => setConfirming(true)}>
                        Delete
                    </button>
                </div>
            )}
            {confirming && (
                <ConfirmModal
                    title="Delete review?"
                    message="This can't be undone."
                    confirmLabel="Delete"
                    pending={pending}
                    error={error}
                    onConfirm={deleteHandler}
                    onCancel={closeHandler}
                />
            )}
        </li>
    );
}
