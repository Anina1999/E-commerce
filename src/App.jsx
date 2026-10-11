import { Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Contact from "./pages/contact/Contact"
import Catalog from "./pages/catalog/Catalog"
import ProductDetails from "./pages/product-details/ProductDetails"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import NotFound from "./pages/not-found/NotFound"

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog/:category" element={<Catalog />} />
                <Route path="products/:productId/details" element={<ProductDetails />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
