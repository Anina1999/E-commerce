import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../header/Header";
import Preloader from "../preloader/Preloader";
import Footer from "../footer/Footer";

export default function Layout() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname, hash, key]);

    return (
        <>
        <Preloader />

        <Header />

        <Outlet />

        <Footer />
        </>
    )
}
