import { Link, useSearchParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ProductCard from "../../components/product-card/ProductCard";
import { products } from "../../data/products";
import styles from "./Catalog.module.css";

const PRODUCTS_PER_PAGE = 9;

export default function Catalog() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const pageProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

    const pageCount = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const pageNumbers = [];
    for (let number = 1; number <= pageCount; number++) {
        pageNumbers.push(number);
    }

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
                                subtitle={`${products.length} products`}
                            />
                        </div>
                    </div>

                    <div className="row">
                        {pageProducts.map((product) => (
                            <div key={product.id} className={`col-lg-4 col-md-6 ${styles.cell}`}>
                                <ProductCard
                                    productId={product.id}
                                    productName={product.name}
                                    productPrice={product.price}
                                    productImage={product.image}
                                />
                            </div>
                        ))}
                    </div>

                    <nav className={styles.pagination}>
                        <ul>
                            {pageNumbers.map((number) => (
                                <li key={number}>
                                    <Link to={`?page=${number}`} className={number === page ? styles.active : ""}>
                                        {number}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
}
