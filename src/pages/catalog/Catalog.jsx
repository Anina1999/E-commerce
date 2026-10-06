import { NavLink, useParams, useSearchParams } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ProductCard from "../../components/product-card/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import NotFound from "../not-found/NotFound";
import { getProductsByCategory, products } from "../../data/products";
import styles from "./Catalog.module.css";

const PRODUCTS_PER_PAGE = 9;

const filterLinkClass = ({ isActive }) => (isActive ? styles.active : "");

export default function Catalog() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const catalogProducts = category ? getProductsByCategory(category) : products;

    if (catalogProducts.length === 0) {
        return <NotFound />;
    }

    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const pageProducts = catalogProducts.slice(start, start + PRODUCTS_PER_PAGE);

    const pageCount = Math.ceil(catalogProducts.length / PRODUCTS_PER_PAGE);

    return (
        <>
            <PageHeading
                variant="catalog"
                title="Check Our Gear"
                subtitle="Everything we stock for the trail, the road and the rock"
            />

            <section className={`ridge-section ${styles.products}`}>
                <div className="container">
                    <div className={`row align-items-end ${styles.toolbar}`}>
                        <div className="col-lg-6">
                            <SectionHeading
                                eyebrow="Catalog"
                                title={category ? `Gear for ${category}` : "All Our Gear"}
                                subtitle={`${catalogProducts.length} products`}
                            />
                        </div>
                        <div className="col-lg-6">
                            <nav className={styles.filters}>
                                <NavLink to="/catalog" end className={filterLinkClass}>All</NavLink>
                                <NavLink to="/catalog/hiking" className={filterLinkClass}>Hiking</NavLink>
                                <NavLink to="/catalog/running" className={filterLinkClass}>Running</NavLink>
                                <NavLink to="/catalog/biking" className={filterLinkClass}>Biking</NavLink>
                                <NavLink to="/catalog/climbing" className={filterLinkClass}>Climbing</NavLink>
                            </nav>
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

                    <Pagination className={styles.pagination} page={page} pageCount={pageCount} />
                </div>
            </section>
        </>
    );
}
