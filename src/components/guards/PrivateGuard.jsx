import { Navigate, Outlet, useLocation } from "react-router";
import Loader from "../loader/Loader";
import useAuth from "../../hooks/useAuth";

export default function PrivateGuard() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (isAuthenticated) {
        return <Outlet />;
    }

    if (loading) {
        return <Loader />;
    }

    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
}
