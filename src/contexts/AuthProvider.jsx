import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getProfile, onAuthChange, signIn, signOut, signUp } from "../services/authService";
import useAsync from "../hooks/useAsync";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [sessionChecked, setSessionChecked] = useState(false);

    const userId = user?.id;
    const { data: profile, error: profileError } = useAsync((signal) =>
        userId ? getProfile(userId, signal) : null,
        [userId]
    );

    useEffect(() => {
        const subscription = onAuthChange((event, session) => {
            setUser(session?.user ?? null);
            setSessionChecked(true);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const profileLoading = !!user && !profile && !profileError;

    const value = {
        user,
        profile,
        loading: !sessionChecked || profileLoading,
        profileError,
        isAuthenticated: !!user,
        isAdmin: profile?.role === "admin",
        login: signIn,
        register: signUp,
        logout: signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
