import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ProductCard from "../../components/product-card/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import EmptyState from "../../components/empty-state/EmptyState";
import NotFound from "../not-found/NotFound";
import { getProducts } from "../../services/productService";
import useAsync from "../../hooks/useAsync";
import { paginate } from "../../utils/pagination";
import { categories } from "../../data/categories";
import styles from "./Catalog.module.css";

const PRODUCTS_PER_PAGE = 9;

export default function Catalog() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const { pathname, hash, key } = useLocation();
    const navigate = useNavigate();
    const productsRef = useRef(null);
    const { data: products = [], loading, error } = useAsync((signal) =>
        getProducts(category, signal),
        [category]
    );

    useEffect(() => {
        if (hash === "#products") {
            productsRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [hash, key]);

    if (category && !categories.some((item) => item.id === category)) {
        return <NotFound />;
    }

    const page = Number(searchParams.get("page")) || 1;
    const { pageItems: pageProducts, pageCount } = paginate(products, page, PRODUCTS_PER_PAGE);

    const isReady = !loading && !error;

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
                                subtitle={isReady && `${products.length} products`}
                            />
                        </div>
                        <div className="col-lg-4">
                            {isReady && (
                                <Pagination
                                    className={styles.paginationTop}
                                    page={page}
                                    pageCount={pageCount}
                                    hash="#products"
                                />
                            )}
                        </div>
                        <div className={`col-lg-4 ${styles.category}`}>
                            <select value={pathname} onChange={handleCategoryChange} aria-label="Category">
                                <option value="/catalog">All categories</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={`/catalog/${item.id}`}>{item.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading && <Loader />}
                    {!loading && error && <ErrorMessage />}
                    {isReady && products.length === 0 && <EmptyState />}
                    {isReady && products.length > 0 && (
                        <>
                            <div className="row">
                                {pageProducts.map((product) => (
                                    <div key={product.id} className={`col-lg-4 col-md-6 ${styles.cell}`}>
                                        <ProductCard
                                            productId={product.id}
                                            productName={product.name}
                                            productPrice={product.price}
                                            productImage={product.image_url}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Pagination
                                className={styles.pagination}
                                page={page}
                                pageCount={pageCount}
                                hash="#products"
                            />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
