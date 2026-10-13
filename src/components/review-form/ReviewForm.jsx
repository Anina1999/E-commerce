import { useState } from "react";
import useForm from "../../hooks/useForm";
import ErrorMessage from "../error-message/ErrorMessage";
import { createReview } from "../../services/reviewService";
import { getReviewErrorMessage } from "../../utils/reviewErrorMessage";
import styles from "./ReviewForm.module.css";

const initialValues = {
    rating: "",
    content: "",
};

export default function ReviewForm({ productId, refreshReviews, className }) {
    const [showErrors, setShowErrors] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const reviewSubmitHandler = async (values) => {
        if (!values.rating || !values.content.trim()) {
            setShowErrors(true);
            return;
        }

        setError("");
        setPending(true);

        try {
            await createReview(productId, Number(values.rating), values.content);
            await refreshReviews();
        } catch (err) {
            setError(getReviewErrorMessage(err));
            setPending(false);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, reviewSubmitHandler);

    const ratingError = showErrors && !values.rating;
    const contentError = showErrors && !values.content.trim();
    const rootClassName = [styles.reviewForm, className].filter(Boolean).join(" ");

    return (
        <form className={rootClassName} onSubmit={submitHandler}>
            <fieldset>
                <legend>Your rating</legend>
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star}>
                            <input type="radio" name="rating" value={star} checked={values.rating === String(star)} onChange={changeHandler} aria-label={`${star} out of 5 stars`} />
                            <i className={star <= Number(values.rating) ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
                        </label>
                    ))}
                </div>
                {ratingError && <ErrorMessage variant="form" className={styles.fieldError} message="Please rate our product." />}
            </fieldset>
            <fieldset>
                <textarea name="content" placeholder="Your review" aria-label="Your review" maxLength={1000} value={values.content} onChange={changeHandler} />
                {contentError && <ErrorMessage variant="form" className={styles.fieldError} message="Please write your review." />}
            </fieldset>
            {error && <ErrorMessage variant="form" className={styles.error} message={error} />}
            <button type="submit" disabled={pending}>{pending ? "Please wait..." : "Post Review"}</button>
        </form>
    );
}
