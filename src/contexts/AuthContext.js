import { createContext } from "react";

const AuthContext = createContext({
    user: null,
    profile: null,
    loading: true,
    profileError: null,
    isAuthenticated: false,
    isAdmin: false,
    login() {},
    register() {},
    logout() {},
});

export default AuthContext;
