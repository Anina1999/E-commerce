import { useState } from "react";
import { useParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import StarRating from "../../components/star-rating/StarRating";
import FavoriteButton from "../../components/favorite-button/FavoriteButton";
import ProductReviews from "../../components/product-reviews/ProductReviews";
import NotFound from "../not-found/NotFound";
import { getProductById } from "../../services/productService";
import { getReviews } from "../../services/reviewService";
import useAsync from "../../hooks/useAsync";
import { formatPrice } from "../../utils/formatPrice";
import { getRating } from "../../utils/rating";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
    const { productId } = useParams();
    const { data: product, loading, error } = useAsync((signal) =>
        getProductById(productId, signal),
        [productId]
    );
    const { data: reviews, loading: reviewsLoading, error: reviewsError, refresh: refreshReviews } = useAsync((signal) =>
        getReviews(productId, signal),
        [productId]
    );
    const [quantity, setQuantity] = useState(1);
    const [shownProductId, setShownProductId] = useState(productId);

    if (productId !== shownProductId) {
        setShownProductId(productId);
        setQuantity(1);
    }

    const isReady = !loading && !error;
    const reviewsReady = !reviewsLoading && !reviewsError;
    const rating = reviewsReady ? getRating(reviews) : null;

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
                                    <div className={styles.favoriteCorner}>
                                        <FavoriteButton
                                            variant="details"
                                            productId={product.id}
                                            productName={product.name}
                                        />
                                    </div>
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
                        <ProductReviews
                            key={productId}
                            className={styles.reviews}
                            productId={productId}
                            reviews={reviews}
                            loading={reviewsLoading}
                            error={reviewsError}
                            refreshReviews={refreshReviews}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
