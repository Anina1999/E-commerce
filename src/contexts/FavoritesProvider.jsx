import { useState } from "react";
import FavoritesContext from "./FavoritesContext";
import { addFavorite, getFavoriteIds, removeFavorite } from "../services/favoriteService";
import useAsync from "../hooks/useAsync";
import useAuth from "../hooks/useAuth";

export default function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const [updateError, setUpdateError] = useState(null);

    const userId = user?.id;
    const { data: favoriteIds = [], loading, error, refresh } = useAsync((signal) =>
        userId ? getFavoriteIds(signal) : [],
        [userId]
    );

    const isFavorite = (productId) => favoriteIds.includes(productId);

    const toggleFavorite = async (productId) => {
        setUpdateError(null);

        try {
            if (isFavorite(productId)) {
                await removeFavorite(productId);
            } else {
                await addFavorite(productId);
            }

            await refresh();
        } catch (err) {
            setUpdateError(err);
        }
    };

    const value = {
        favoriteIds,
        loading,
        error,
        updateError,
        isFavorite,
        toggleFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}
