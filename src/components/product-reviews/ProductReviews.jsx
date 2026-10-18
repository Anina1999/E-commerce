import { useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import SectionHeading from "../section-heading/SectionHeading";
import Loader from "../loader/Loader";
import ErrorMessage from "../error-message/ErrorMessage";
import EmptyState from "../empty-state/EmptyState";
import ReviewItem from "../review-item/ReviewItem";
import ReviewForm from "../review-form/ReviewForm";
import useAuth from "../../hooks/useAuth";
import styles from "./ProductReviews.module.css";

export default function ProductReviews({ productId, reviews, loading, error, refreshReviews, className }) {
    const location = useLocation();
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const [editing, setEditing] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4);
    const reviewsRef = useRef(null);

    if (!user && editing) {
        setEditing(false);
    }

    const reviewsReady = !loading && !error;
    const ownReview = reviews?.find((review) => review.author_id === user?.id);
    const otherReviews = reviews?.filter((review) => review.author_id !== user?.id);
    const shownReviews = otherReviews?.slice(0, isAuthenticated ? visibleCount - 1 : visibleCount);
    const hasMoreReviews = reviewsReady && shownReviews.length < otherReviews.length;
    const canShowFewer = reviewsReady && visibleCount > 4;

    const showFewerHandler = () => {
        setVisibleCount(4);
        reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={`${styles.reviews} ${className}`} ref={reviewsRef}>
            <SectionHeading
                title="Reviews"
                subtitle="What other hikers, bicyclist, runners and climbers think of it"
            />
            {reviewsReady && !authLoading && !isAuthenticated && (
                <div className={`main-border-button main-teal-button ${styles.login}`}>
                    <Link to="/login" state={{ from: location.pathname }}>
                        Log in to write a review
                    </Link>
                </div>
            )}
            {loading && <Loader />}
            {!loading && error && <ErrorMessage />}
            {reviewsReady && !authLoading && !isAuthenticated && reviews.length === 0 && (
                <EmptyState message="No reviews yet" />
            )}
            {reviewsReady && (isAuthenticated || reviews.length > 0) && (
                <ul className={styles.reviewList}>
                    {isAuthenticated && !ownReview && (
                        <li className={styles.formCard}>
                            <ReviewForm productId={productId} refreshReviews={refreshReviews} />
                        </li>
                    )}
                    {ownReview && editing && (
                        <li className={styles.formCard}>
                            <ReviewForm
                                review={ownReview}
                                refreshReviews={refreshReviews}
                                onClose={() => setEditing(false)}
                            />
                        </li>
                    )}
                    {ownReview && !editing && (
                        <ReviewItem
                            review={ownReview}
                            isOwn
                            onEdit={() => setEditing(true)}
                            refreshReviews={refreshReviews}
                        />
                    )}
                    {shownReviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </ul>
            )}
            {(hasMoreReviews || canShowFewer) && (
                <div className={styles.listButtons}>
                    {hasMoreReviews && (
                        <button
                            type="button"
                            className={styles.listButton}
                            onClick={() => setVisibleCount(visibleCount + 4)}
                        >
                            Show more reviews
                        </button>
                    )}
                    {canShowFewer && (
                        <button type="button" className={styles.listButton} onClick={showFewerHandler}>
                            Show fewer reviews
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
