import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import AppAlerts from "../app-alerts/AppAlerts";
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

const pageLinks = [
    { to: "/about", label: "About Us" },
    { to: "/catalog", label: "Catalog" },
    { to: "/contact", label: "Contact Us" },
];

const accountLinks = [
    { to: "/favorites", label: "Favorites", roles: ["user", "admin"] },
    { to: "/orders", label: "My Orders", roles: ["user", "admin"] },
    { to: "/admin/products", label: "Admin Panel", roles: ["admin"] },
    { to: "/login", label: "Login", roles: ["guest"] },
    { to: "/register", label: "Register", roles: ["guest"] },
];

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
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const isHome = pathname === "/";
    const { isSticky, activeSection, setActiveSection } = useHeaderScroll(sectionIds, isHome);

    let role = "guest";
    if (isAuthenticated) role = "user";
    if (isAdmin) role = "admin";

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
        navigate("/");
        await logout();
    };

    return (
        <header className={isSticky ? `${styles.header} ${styles.sticky}` : styles.header}>
            <AppAlerts className={styles.alert} />
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
                                        {pageLinks.map((link) => (
                                            <li key={link.to}>
                                                <NavLink to={link.to} className={pageLinkClass} onClick={closeMenus}>
                                                    {link.label}
                                                </NavLink>
                                            </li>
                                        ))}
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
                                        {accountLinks
                                            .filter((link) => link.roles.includes(role))
                                            .map((link) => (
                                                <li key={link.to}>
                                                    <NavLink to={link.to} className={pageLinkClass} onClick={closeMenus}>
                                                        {link.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        {isAuthenticated && (
                                            <li>
                                                <button type="button" className={styles.logout} onClick={logoutHandler}>
                                                    Logout
                                                </button>
                                            </li>
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
                                    <NavLink
                                        to="/cart"
                                        className={pageLinkClass}
                                        aria-label="Cart"
                                        onClick={closeMenus}
                                    >
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
