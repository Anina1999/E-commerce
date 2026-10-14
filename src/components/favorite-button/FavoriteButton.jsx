import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useFavorites from "../../hooks/useFavorites";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton({ productId, productName, variant }) {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { loading, isFavorite, toggleFavorite } = useFavorites();
    const [pending, setPending] = useState(false);

    const favorite = isFavorite(productId);
    const className = [styles.favoriteButton, styles[variant], favorite && styles.favorite].filter(Boolean).join(" ");

    const clickHandler = async () => {
        setPending(true);
        await toggleFavorite(productId);
        setPending(false);
    };

    if (!isAuthenticated) {
        return (
            <Link
                to="/login"
                state={{ from: location.pathname }}
                className={className}
                aria-label={`Log in to add to favorites: ${productName}`}
            >
                <i className="fa fa-heart-o" aria-hidden="true" />
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={className}
            onClick={clickHandler}
            disabled={loading || pending}
            aria-label={`${favorite ? "Remove from favorites" : "Add to favorites"}: ${productName}`}
        >
            <i className={favorite ? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true" />
        </button>
    );
}
