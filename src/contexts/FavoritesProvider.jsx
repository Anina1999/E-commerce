import { useEffect, useState } from "react";
import FavoritesContext from "./FavoritesContext";
import { addFavorite, getFavoriteIds, removeFavorite } from "../services/favoriteService";
import useAsync from "../hooks/useAsync";
import useAuth from "../hooks/useAuth";

export default function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id;
    const [updateError, setUpdateError] = useState(null);
    const [shownUserId, setShownUserId] = useState(userId);

    if (userId !== shownUserId) {
        setShownUserId(userId);
        setUpdateError(null);
    }

    const { data: favoriteIds = [], loading, error, refresh } = useAsync((signal) =>
        userId ? getFavoriteIds(signal) : [],
        [userId]
    );

    useEffect(() => {
        if (!userId) {
            return;
        }

        window.addEventListener("focus", refresh);

        return () => window.removeEventListener("focus", refresh);
    }, [userId, refresh]);

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
