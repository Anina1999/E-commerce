import { Link } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ProductCard from "../../components/product-card/ProductCard";
import styles from "./Catalog.module.css";

export default function Catalog() {
    return (
        <>
            <PageHeading
                variant="catalog"
                title="Check Our Gear"
                subtitle="Everything we stock for the trail, the road and the rock"
            />

            <section className={`ridge-section ${styles.products}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <SectionHeading
                                className={styles.heading}
                                eyebrow="Catalog"
                                title="All Our Gear"
                                subtitle="Check out everything we stock."
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-1"
                                productName="Trail Hiking Boots"
                                productPrice={165.00}
                                productImage="/assets/images/product-hiking-boots.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-2"
                                productName="Trekking Poles"
                                productPrice={60.00}
                                productImage="/assets/images/product-trekking-poles.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-3"
                                productName="Waterproof Shell Jacket"
                                productPrice={210.00}
                                productImage="/assets/images/product-shell-jacket.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-4"
                                productName="Daypack 30L"
                                productPrice={95.00}
                                productImage="/assets/images/product-daypack.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-5"
                                productName="LED Headlamp"
                                productPrice={45.00}
                                productImage="/assets/images/product-headlamp.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-6"
                                productName="Navigation Compass"
                                productPrice={35.00}
                                productImage="/assets/images/product-compass.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-7"
                                productName="Vacuum Flask 1L"
                                productPrice={50.00}
                                productImage="/assets/images/product-vacuum-flask.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="hiking-8"
                                productName="Merino Beanie"
                                productPrice={30.00}
                                productImage="/assets/images/product-merino-beanie.jpg"
                            />
                        </div>
                        <div className={`col-lg-4 col-md-6 ${styles.cell}`}>
                            <ProductCard
                                productId="running-1"
                                productName="Road Running Shoes"
                                productPrice={135.00}
                                productImage="/assets/images/product-running-shoes.jpg"
                            />
                        </div>
                    </div>

                    <nav className={styles.pagination} aria-label="Pagination">
                        <ul>
                            <li>
                                <Link to="?page=1" className={styles.active} aria-current="page">1</Link>
                            </li>
                            <li>
                                <Link to="?page=2">2</Link>
                            </li>
                            <li>
                                <Link to="?page=3">3</Link>
                            </li>
                            <li>
                                <Link to="?page=4">4</Link>
                            </li>
                            <li>
                                <Link to="?page=2" aria-label="Next page">
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
}
