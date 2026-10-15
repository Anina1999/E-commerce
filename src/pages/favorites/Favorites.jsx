import { Link } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ProductCard from "../../components/product-card/ProductCard";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import EmptyState from "../../components/empty-state/EmptyState";
import { getProductsByIds } from "../../services/productService";
import useAsync from "../../hooks/useAsync";
import useFavorites from "../../hooks/useFavorites";
import styles from "./Favorites.module.css";

export default function Favorites() {
    const { favoriteIds, loading: favoritesLoading, error: favoritesError, isFavorite } = useFavorites();
    const { data: products, loading, error } = useAsync((signal) =>
        favoritesLoading ? null : getProductsByIds(favoriteIds, signal),
        [favoritesLoading]
    );

    const isLoading = favoritesLoading || loading || (!products && !error);
    const loadError = favoritesError || error;
    const isReady = !isLoading && !loadError;
    const favoriteProducts = isReady ? products.filter((product) => isFavorite(product.id)) : [];

    return (
        <>
            <PageHeading
                variant="favorites"
                title="My Favorites"
                subtitle="The gear you saved for your next adventure"
            />

            <section className={`ridge-section ${styles.products}`}>
                <div className="container">
                    <SectionHeading
                        className={styles.heading}
                        eyebrow="Favorites"
                        title="Saved Gear"
                        subtitle={isReady && `${favoriteProducts.length} products`}
                    />

                    {isLoading && <Loader />}
                    {!isLoading && loadError && <ErrorMessage />}
                    {isReady && favoriteProducts.length === 0 && (
                        <>
                            <EmptyState message="No favorites yet" />
                            <div className="text-center">
                                <div className="main-border-button main-teal-button">
                                    <Link to="/catalog">Browse the Catalog</Link>
                                </div>
                            </div>
                        </>
                    )}
                    {isReady && favoriteProducts.length > 0 && (
                        <div className="row">
                            {favoriteProducts.map((product) => (
                                <div key={product.id} className={`col-lg-4 col-md-6 ${styles.cell}`}>
                                    <ProductCard
                                        productId={product.id}
                                        productName={product.name}
                                        productPrice={product.price}
                                        productImage={product.image_url}
                                        productReviews={product.reviews}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
