import { Outlet } from "react-router";
import Header from "./Header";
import Preloader from "./Preloader";
import Footer from "./Footer";

export default function Layout() {
    return (
        <>
        <Preloader />

        <Header />

        <Outlet />

        <Footer />
        </>
    )
}