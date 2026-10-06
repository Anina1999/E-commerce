import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ProductCard from "../../components/product-card/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import NotFound from "../not-found/NotFound";
import { getProductsByCategory, products } from "../../data/products";
import styles from "./Catalog.module.css";

const PRODUCTS_PER_PAGE = 9;

export default function Catalog() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const { pathname, hash, key } = useLocation();
    const navigate = useNavigate();
    const productsRef = useRef(null);

    useEffect(() => {
        if (hash === "#products") {
            productsRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [hash, key]);

    const catalogProducts = category ? getProductsByCategory(category) : products;

    if (catalogProducts.length === 0) {
        return <NotFound />;
    }

    const page = Number(searchParams.get("page")) || 1;
    const pageCount = Math.ceil(catalogProducts.length / PRODUCTS_PER_PAGE);
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const pageProducts = catalogProducts.slice(start, start + PRODUCTS_PER_PAGE);

    const handleCategoryChange = (event) => {
        navigate(`${event.target.value}#products`);
    };

    return (
        <>
            <PageHeading
                variant="catalog"
                title="Check Our Gear"
                subtitle="Everything we stock for the trail, the road and the rock"
            />

            <section className={`ridge-section ${styles.products}`}>
                <div className="container">
                    <div ref={productsRef} className={`row align-items-end ${styles.toolbar}`}>
                        <div className="col-lg-4">
                            <SectionHeading
                                eyebrow="Catalog"
                                title={category ? `Gear for ${category}` : "All Our Gear"}
                                subtitle={`${catalogProducts.length} products`}
                            />
                        </div>
                        <div className="col-lg-4">
                            <Pagination className={styles.paginationTop} page={page} pageCount={pageCount} hash="#products" />
                        </div>
                        <div className={`col-lg-4 ${styles.category}`}>
                            <select value={pathname} onChange={handleCategoryChange} aria-label="Category">
                                <option value="/catalog">All categories</option>
                                <option value="/catalog/hiking">Hiking</option>
                                <option value="/catalog/running">Running</option>
                                <option value="/catalog/biking">Biking</option>
                                <option value="/catalog/climbing">Climbing</option>
                            </select>
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

                    <Pagination className={styles.pagination} page={page} pageCount={pageCount} hash="#products" />
                </div>
            </section>
        </>
    );
}
