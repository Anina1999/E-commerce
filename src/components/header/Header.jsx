import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import ErrorMessage from "../error-message/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import useHeaderScroll from "../../hooks/useHeaderScroll";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

const sectionLinks = [
    { id: "top", label: "Home" },
    { id: "hiking", label: "Hiking" },
    { id: "running", label: "Running" },
    { id: "biking", label: "Biking" },
    { id: "climbing", label: "Climbing" },
    { id: "explore", label: "Explore", afterSubmenus: true },
];

const sectionIds = sectionLinks.map((link) => link.id);

const pageLinkClass = ({ isActive }) => (isActive ? styles.active : undefined);

function SectionLink({ id, label, activeSection, onSelect }) {
    return (
        <li className={styles.sectionLink}>
            <Link
                to={`/#${id}`}
                className={activeSection === id ? styles.active : undefined}
                onClick={() => onSelect(id)}
            >
                {label}
            </Link>
        </li>
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, profileError, logout } = useAuth();
    const isHome = pathname === "/";
    const { isSticky, activeSection, setActiveSection } = useHeaderScroll(sectionIds, isHome);

    const handleSectionSelect = (id) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    const closeMenus = () => {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
    };

    const toggleSubmenu = (name) => {
        setOpenSubmenu((current) => (
            current === name ? null : name
        ));
    };

    const logoutHandler = async () => {
        closeMenus();

        try {
            await logout();
        } finally {
            navigate("/");
        }
    };

    return (
        <header className={isSticky ? `${styles.header} ${styles.sticky}` : styles.header}>
            {profileError && (
                <ErrorMessage
                    variant="banner"
                    className={styles.alert}
                    message="We couldn't load your account. Please refresh the page."
                />
            )}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className={styles.mainNav}>
                            <Link to="/" className={styles.logo}>
                                <img src={logo} alt="Tourashop" />
                            </Link>
                            <ul className={isMenuOpen ? `nav ${styles.nav} ${styles.open}` : `nav ${styles.nav}`}>
                                {sectionLinks
                                    .filter((link) => !link.afterSubmenus)
                                    .map((link) => (
                                        <SectionLink
                                            key={link.id}
                                            {...link}
                                            activeSection={activeSection}
                                            onSelect={handleSectionSelect}
                                        />
                                    ))}

                                <li className={styles.submenu}>
                                    <button
                                        type="button"
                                        className={styles.submenuToggle}
                                        aria-expanded={openSubmenu === "pages"}
                                        onClick={() => toggleSubmenu("pages")}
                                    >
                                        Pages
                                    </button>
                                    <ul className={openSubmenu === "pages" ? styles.open : undefined}>
                                        <li>
                                            <NavLink to="/about" className={pageLinkClass} onClick={closeMenus}>About Us</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/catalog" className={pageLinkClass} onClick={closeMenus}>Catalog</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/contact" className={pageLinkClass} onClick={closeMenus}>Contact Us</NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className={styles.submenu}>
                                    <button
                                        type="button"
                                        className={styles.submenuToggle}
                                        aria-expanded={openSubmenu === "account"}
                                        onClick={() => toggleSubmenu("account")}
                                    >
                                        Account
                                    </button>
                                    <ul className={openSubmenu === "account" ? styles.open : undefined}>
                                        <li>
                                            <NavLink to="/favorites" className={pageLinkClass} onClick={closeMenus}>Favorites</NavLink>
                                        </li>
                                        {isAuthenticated && (
                                            <li>
                                                <NavLink to="/orders" className={pageLinkClass} onClick={closeMenus}>My Orders</NavLink>
                                            </li>
                                        )}
                                        {isAdmin && (
                                            <li>
                                                <NavLink to="/admin/products" className={pageLinkClass} onClick={closeMenus}>Admin Panel</NavLink>
                                            </li>
                                        )}
                                        {isAuthenticated ? (
                                            <li>
                                                <button type="button" className={styles.logout} onClick={logoutHandler}>Logout</button>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <NavLink to="/login" className={pageLinkClass} onClick={closeMenus}>Login</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/register" className={pageLinkClass} onClick={closeMenus}>Register</NavLink>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </li>
                                {sectionLinks
                                    .filter((link) => link.afterSubmenus)
                                    .map((link) => (
                                        <SectionLink
                                            key={link.id}
                                            {...link}
                                            activeSection={activeSection}
                                            onSelect={handleSectionSelect}
                                        />
                                    ))}
                                <li className={styles.cartLink}>
                                    <NavLink to="/cart" className={pageLinkClass} aria-label="Cart" onClick={closeMenus}>
                                        <i className="fa fa-shopping-cart" aria-hidden="true" />
                                    </NavLink>
                                </li>

                            </ul>
                            <button
                                type="button"
                                className={isMenuOpen ? `${styles.menuTrigger} ${styles.open}` : styles.menuTrigger}
                                aria-label="Menu"
                                aria-expanded={isMenuOpen}
                                onClick={() => setIsMenuOpen((open) => !open)}
                            >
                                <span>Menu</span>
                            </button>

                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}