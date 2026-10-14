import { Link } from "react-router";
import FavoriteButton from "../favorite-button/FavoriteButton";
import StarRating from "../star-rating/StarRating";
import { formatPrice } from "../../utils/formatPrice";
import { getRating } from "../../utils/rating";
import styles from "./ProductCard.module.css";

export default function ProductCard({
    productId,
    productName,
    productPrice,
    productImage,
    productReviews
}) {
    return (
        <div className={styles.item}>
            <div className={styles.thumb}>
                <div className={styles.hoverContent}>
                    <ul>
                        <li>
                            <Link
                                to={`/products/${productId}/details`}
                                className={styles.action}
                                aria-label={`View details: ${productName}`}
                            >
                                <i className="fa fa-eye" aria-hidden="true" />
                            </Link>
                        </li>
                        <li>
                            <FavoriteButton variant="card" productId={productId} productName={productName} />
                        </li>
                        <li>
                            <button type="button" className={styles.action} aria-label={`Add to cart: ${productName}`}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                            </button>
                        </li>
                    </ul>
                </div>
                <img src={productImage} alt={productName} />
            </div>
            <div className={styles.downContent}>
                <h4>{productName}</h4>
                <div className={styles.priceRow}>
                    <span>{formatPrice(productPrice)}</span>
                    <StarRating rating={getRating(productReviews).average} />
                </div>
            </div>
        </div>
    );
}
