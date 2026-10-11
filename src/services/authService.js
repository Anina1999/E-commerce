import { supabase } from "../lib/supabase";

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return data;
}

export async function signUp(username, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
    });

    if (error) throw error;

    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
}

export async function getProfile(userId, signal) {
    const { data, error } = await supabase.from("profiles")
        .select("username, role")
        .eq("id", userId)
        .abortSignal(signal)
        .single();

    if (error) throw error;

    return data;
}

export function onAuthChange(callback) {
    const { data } = supabase.auth.onAuthStateChange(callback);

    return data.subscription;
}
