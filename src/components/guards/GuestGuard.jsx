import { Navigate, Outlet } from "react-router";
import Loader from "../loader/Loader";
import useAuth from "../../hooks/useAuth";

export default function GuestGuard() {
    const { isAuthenticated, loading } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (loading) {
        return <Loader />;
    }

    return <Outlet />;
}
