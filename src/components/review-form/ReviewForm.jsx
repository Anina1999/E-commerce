import { useState } from "react";
import ErrorMessage from "../error-message/ErrorMessage";
import { createReview, updateReview } from "../../services/reviewService";
import useForm from "../../hooks/useForm";
import { getReviewErrorMessage } from "../../utils/reviewErrorMessage";
import styles from "./ReviewForm.module.css";

const initialValues = {
    rating: "",
    content: "",
};

export default function ReviewForm({ productId, review, refreshReviews, onClose, className }) {
    const [showErrors, setShowErrors] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const reviewSubmitHandler = async (values) => {
        if (!values.rating || !values.content.trim()) {
            setShowErrors(true);
            return;
        }

        setError("");
        setPending(true);

        try {
            if (review) {
                await updateReview(review.id, Number(values.rating), values.content);
                await refreshReviews();
                onClose();
            } else {
                await createReview(productId, Number(values.rating), values.content);
                await refreshReviews();
            }
        } catch (err) {
            setError(getReviewErrorMessage(err));
            setPending(false);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(
        review ? { rating: String(review.rating), content: review.content } : initialValues,
        reviewSubmitHandler
    );

    const ratingError = showErrors && !values.rating;
    const contentError = showErrors && !values.content.trim();
    const shownRating = hoverRating || Number(values.rating);
    const submitLabel = review ? "Save Changes" : "Post Review";
    const rootClassName = [styles.reviewForm, className].filter(Boolean).join(" ");

    return (
        <form className={rootClassName} onSubmit={submitHandler}>
            <fieldset>
                <legend>Your rating</legend>
                <div className={styles.stars} onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} onMouseEnter={() => setHoverRating(star)}>
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                checked={values.rating === String(star)}
                                onChange={changeHandler}
                                aria-label={`${star} out of 5 stars`}
                            />
                            <i className={star <= shownRating ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
                        </label>
                    ))}
                </div>
                {ratingError && (
                    <ErrorMessage variant="form" className={styles.fieldError} message="Please rate our product." />
                )}
            </fieldset>
            <fieldset>
                <textarea
                    name="content"
                    placeholder="Your review"
                    aria-label="Your review"
                    maxLength={1000}
                    value={values.content}
                    onChange={changeHandler}
                />
                {contentError && (
                    <ErrorMessage variant="form" className={styles.fieldError} message="Please write your review." />
                )}
            </fieldset>
            {error && <ErrorMessage variant="form" className={styles.error} message={error} />}
            <button type="submit" className={styles.submit} disabled={pending}>
                {pending ? "Please wait..." : submitLabel}
            </button>
            {review && (
                <button type="button" className={styles.cancel} onClick={onClose} disabled={pending}>
                    Cancel
                </button>
            )}
        </form>
    );
}
