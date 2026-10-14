import { createContext } from "react";

const FavoritesContext = createContext({
    favoriteIds: [],
    loading: false,
    error: null,
    updateError: null,
    isFavorite() {},
    toggleFavorite() {},
});

export default FavoritesContext;
