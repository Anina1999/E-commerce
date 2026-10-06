import { Link } from "react-router";
import styles from "./ProductCard.module.css";

export default function ProductCard({
    productId,
    productName,
    productPrice,
    productImage
}) {
    return (
        <div className={styles.item}>
            <div className={styles.thumb}>
                <div className={styles.hoverContent}>
                    <ul>
                        <li>
                            <Link to={`/products/${productId}`} aria-label={`View details: ${productName}`}>
                                <i className="fa fa-eye" aria-hidden="true" />
                            </Link>
                        </li>
                        <li>
                            <button type="button" aria-label={`Add to favorites: ${productName}`}>
                                <i className="fa fa-heart-o" aria-hidden="true" />
                            </button>
                        </li>
                        <li>
                            <button type="button" aria-label={`Add to cart: ${productName}`}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                            </button>
                        </li>
                    </ul>
                </div>
                <img src={productImage} alt={productName} />
            </div>
            <div className={styles.downContent}>
                <h4>{productName}</h4>
                <span>${productPrice.toFixed(2)}</span>
                <ul className={styles.stars}>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                    <li>
                        <i className="fa fa-star" />
                    </li>
                </ul>
            </div>
        </div>
    );
}