import { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import EmptyState from "../../components/empty-state/EmptyState";
import ReviewItem from "../../components/review-item/ReviewItem";
import ReviewForm from "../../components/review-form/ReviewForm";
import StarRating from "../../components/star-rating/StarRating";
import NotFound from "../not-found/NotFound";
import { getProductById } from "../../services/productService";
import { getReviews } from "../../services/reviewService";
import useAsync from "../../hooks/useAsync";
import useAuth from "../../hooks/useAuth";
import { formatPrice } from "../../utils/formatPrice";
import { getRating } from "../../utils/rating";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
    const { productId } = useParams();
    const location = useLocation();
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const { data: product, loading, error } = useAsync((signal) =>
        getProductById(productId, signal),
        [productId]
    );
    const { data: reviews, loading: reviewsLoading, error: reviewsError, refresh: refreshReviews } = useAsync((signal) =>
        getReviews(productId, signal),
        [productId]
    );
    const [quantity, setQuantity] = useState(1);
    const [editing, setEditing] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4);
    const [shownProductId, setShownProductId] = useState(productId);
    const reviewsRef = useRef(null);

    if (productId !== shownProductId) {
        setShownProductId(productId);
        setQuantity(1);
        setEditing(false);
        setVisibleCount(4);
    }

    if (!user && editing) {
        setEditing(false);
    }

    const isReady = !loading && !error;
    const reviewsReady = !reviewsLoading && !reviewsError;
    const ownReview = reviews?.find((review) => review.author_id === user?.id);
    const otherReviews = reviews?.filter((review) => review.author_id !== user?.id);
    const rating = reviewsReady ? getRating(reviews) : null;
    const shownReviews = otherReviews?.slice(0, isAuthenticated ? visibleCount - 1 : visibleCount);
    const hasMoreReviews = reviewsReady && shownReviews.length < otherReviews.length;
    const canShowFewer = reviewsReady && visibleCount > 4;

    const showFewerHandler = () => {
        setVisibleCount(4);
        reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    if (isReady && !product) {
        return <NotFound />;
    }

    return (
        <>
            <PageHeading
                variant="product"
                title="Gear Details"
                subtitle="Take a closer look before you hit the trail"
            />

            <section className={`ridge-section ${styles.product}`}>
                <div className="container">
                    {loading && <Loader />}
                    {!loading && error && <ErrorMessage />}
                    {isReady && (
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={styles.image}>
                                    <img src={product.image_url} alt={product.name} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className={styles.content}>
                                    <h4>{product.name}</h4>
                                    <span className={styles.price}>{formatPrice(product.price)}</span>
                                    <div className={styles.rating}>
                                        {reviewsReady && <StarRating rating={rating.average} />}
                                        {reviewsReady && rating.count === 0 && (
                                            <span className={styles.ratingText}>No ratings yet</span>
                                        )}
                                        {reviewsReady && rating.count > 0 && (
                                            <span className={styles.ratingText}>
                                                {rating.average.toFixed(1)} ({rating.count} {rating.count === 1 ? "review" : "reviews"})
                                            </span>
                                        )}
                                        {!reviewsLoading && reviewsError && (
                                            <span className={styles.ratingText}>Rating unavailable</span>
                                        )}
                                    </div>
                                    <p className={styles.description}>{product.description}</p>
                                    <div className={styles.quote}>
                                        <i className="fa fa-quote-left" />
                                        <p>
                                            Tested by our team on the trails around Boulder before it reaches the shelf.
                                        </p>
                                    </div>
                                    <div className={styles.quantity}>
                                        <h6>Quantity</h6>
                                        <div className={styles.counter}>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity - 1)}
                                                disabled={quantity === 1}
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={quantity}
                                                readOnly
                                                aria-label="Quantity"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.total}>
                                        <h4>Total: {formatPrice(product.price * quantity)}</h4>
                                        <button type="button" className={styles.addToCart}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isReady && (
                        <div className={styles.reviews} ref={reviewsRef}>
                            <SectionHeading
                                title="Reviews"
                                subtitle="What other hikers, bicyclist, runners and climbers think of it"
                            />
                            {reviewsReady && !authLoading && !isAuthenticated && (
                                <Link
                                    to="/login"
                                    state={{ from: location.pathname }}
                                    className={styles.loginButton}
                                >
                                    Log in to write a review
                                </Link>
                            )}
                            {reviewsLoading && <Loader />}
                            {!reviewsLoading && reviewsError && <ErrorMessage />}
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
                    )}
                </div>
            </section>
        </>
    );
}
