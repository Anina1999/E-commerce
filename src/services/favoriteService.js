import { supabase } from "../lib/supabase";

export async function getFavoriteIds(signal) {
    const { data, error } = await supabase.from("favorites")
        .select("product_id")
        .abortSignal(signal);

    if (error) throw error;

    return data.map((favorite) => favorite.product_id);
}

export async function addFavorite(productId) {
    const { error } = await supabase.from("favorites")
        .insert({ product_id: productId });

    if (error) throw error;
}

export async function removeFavorite(productId) {
    const { error } = await supabase.from("favorites")
        .delete()
        .eq("product_id", productId);

    if (error) throw error;
}
