import { use } from "react";
import FavoritesContext from "../contexts/FavoritesContext";

export default function useFavorites() {
    return use(FavoritesContext);
}
