import { supabase } from "../lib/supabase";

export async function getReviews(productId, signal) {
    if (!Number.isInteger(Number(productId))) {
        return [];
    }

    const { data, error } = await supabase.from("reviews")
        .select("*, profiles(username)")
        .eq("product_id", productId)
        .order("created_at", { ascending: false })
        .abortSignal(signal);

    if (error) throw error;

    return data;
}

export async function createReview(productId, rating, content) {
    const { error } = await supabase.from("reviews")
        .insert({ product_id: productId, rating, content });

    if (error) throw error;
}
