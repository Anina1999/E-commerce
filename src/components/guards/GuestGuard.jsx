import { Navigate, Outlet, useLocation } from "react-router";
import Loader from "../loader/Loader";
import useAuth from "../../hooks/useAuth";

export default function GuestGuard() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (isAuthenticated) {
        return <Navigate to={location.state?.from || "/"} replace />;
    }

    if (loading) {
        return <Loader />;
    }

    return <Outlet />;
}
