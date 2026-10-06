import { Outlet } from "react-router";
import Header from "../header/Header";
import Preloader from "../preloader/Preloader";
import Footer from "../footer/Footer";

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