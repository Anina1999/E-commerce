import { useParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import NotFound from "../not-found/NotFound";
import { getProductById } from "../../services/productService";
import useAsync from "../../hooks/useAsync";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
    const { productId } = useParams();
    const { data: product, loading, error } = useAsync((signal) =>
        getProductById(productId, signal),
        [productId]
    );

    const isReady = !loading && !error;

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
                                    <ul className={styles.stars}>
                                        <li><i className="fa fa-star" /></li>
                                        <li><i className="fa fa-star" /></li>
                                        <li><i className="fa fa-star" /></li>
                                        <li><i className="fa fa-star" /></li>
                                        <li><i className="fa fa-star" /></li>
                                    </ul>
                                    <p className={styles.description}>{product.description}</p>
                                    <div className={styles.quote}>
                                        <i className="fa fa-quote-left" />
                                        <p>Tested by our team on the trails around Boulder before it reaches the shelf.</p>
                                    </div>
                                    <div className={styles.quantity}>
                                        <h6>Quantity</h6>
                                        <div className={styles.counter}>
                                            <button type="button" aria-label="Decrease quantity">-</button>
                                            <input type="number" name="quantity" defaultValue={1} min="1" aria-label="Quantity" />
                                            <button type="button" aria-label="Increase quantity">+</button>
                                        </div>
                                    </div>
                                    <div className={styles.total}>
                                        <h4>Total: {formatPrice(product.price)}</h4>
                                        <button type="button" className={styles.addToCart}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
