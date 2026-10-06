import styles from "./ProductCard.module.css";

export default function ProductCard({ 
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
                            <a href="single-product.html" aria-label={`View details: ${productName}`}>
                                <i className="fa fa-eye" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="single-product.html" aria-label={`Add to favorites: ${productName}`}>
                                <i className="fa fa-heart-o" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="single-product.html" aria-label={`Add to cart: ${productName}`}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                            </a>
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