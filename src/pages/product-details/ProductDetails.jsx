import PageHeading from "../../components/page-heading/PageHeading";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
    return (
        <>
            <PageHeading
                variant="product"
                title="Gear Details"
                subtitle="Take a closer look before you hit the trail"
            />

            <section className={`ridge-section ${styles.product}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.image}>
                                <img src="/assets/images/product-shell-jacket.jpg" alt="Waterproof Shell Jacket" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.content}>
                                <h4>Waterproof Shell Jacket</h4>
                                <span className={styles.price}>$210.00</span>
                                <ul className={styles.stars}>
                                    <li><i className="fa fa-star" /></li>
                                    <li><i className="fa fa-star" /></li>
                                    <li><i className="fa fa-star" /></li>
                                    <li><i className="fa fa-star" /></li>
                                    <li><i className="fa fa-star" /></li>
                                </ul>
                                <p className={styles.description}>
                                    Breathable three-layer shell that keeps out wind and rain, with a helmet-compatible hood.
                                </p>
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
                                    <h4>Total: $210.00</h4>
                                    <button type="button" className={styles.addToCart}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
