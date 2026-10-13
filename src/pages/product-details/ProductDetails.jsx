import { useState } from "react";
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

    if (!user && editing) {
        setEditing(false);
    }

    const isReady = !loading && !error;
    const reviewsReady = !reviewsLoading && !reviewsError;
    const hasReviewed = reviewsReady && reviews.some((review) => review.author_id === user?.id);

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
                                    <StarRating rating={5} className={styles.stars} />
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
                        <div className={styles.reviews}>
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
                            {reviewsReady && isAuthenticated && !hasReviewed && (
                                <ReviewForm
                                    className={styles.reviewForm}
                                    productId={productId}
                                    refreshReviews={refreshReviews}
                                />
                            )}
                            {reviewsLoading && <Loader />}
                            {!reviewsLoading && reviewsError && <ErrorMessage />}
                            {reviewsReady && reviews.length === 0 && <EmptyState message="No reviews yet" />}
                            {reviewsReady && reviews.length > 0 && (
                                <ul>
                                    {reviews.map((review) => (
                                        editing && review.author_id === user?.id ? (
                                            <li key={review.id} className={styles.editing}>
                                                <ReviewForm
                                                    review={review}
                                                    refreshReviews={refreshReviews}
                                                    onClose={() => setEditing(false)}
                                                />
                                            </li>
                                        ) : (
                                            <ReviewItem
                                                key={review.id}
                                                review={review}
                                                isOwn={review.author_id === user?.id}
                                                onEdit={() => setEditing(true)}
                                                refreshReviews={refreshReviews}
                                            />
                                        )
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
