import { supabase } from "../lib/supabase";

export async function getProducts(category, signal) {
    let query = supabase.from("products")
        .select("*")
        .order("id");

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query.abortSignal(signal);

    if (error) throw error;

    return data;
}
