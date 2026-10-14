import { supabase } from "../lib/supabase";

export async function getProducts(category, signal) {
    let query = supabase.from("products")
        .select("*, reviews(rating, is_hidden)")
        .order("id");

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query.abortSignal(signal);

    if (error) throw error;

    return data;
}

export async function getProductById(productId, signal) {
    if (!Number.isInteger(Number(productId))) {
        return null;
    }

    const { data, error } = await supabase.from("products")
        .select("*")
        .eq("id", productId)
        .abortSignal(signal)
        .maybeSingle();

    if (error) throw error;

    return data;
}
