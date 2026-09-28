import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import CatalogPage from "./pages/CatalogPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="catalog/:category" element={<CatalogPage />} />
                <Route path="products/:productId" element={<ProductDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default App
