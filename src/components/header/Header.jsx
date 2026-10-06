import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
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
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("top");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const { pathname } = useLocation();
    const isHome = pathname === "/";

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

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);

            if (!isHome) {
                setActiveSection(null);
                return;
            }

            const current = sectionLinks.map((link) => link.id)
                .findLast((id) => {
                    const section = document.getElementById(id);
                    return section && section.getBoundingClientRect().top <= 81;
                });

            if (current) setActiveSection(current);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    return (
        <header className={isSticky ? `${styles.header} ${styles.sticky}` : styles.header}>
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
                                            <NavLink to="/login" className={pageLinkClass} onClick={closeMenus}>Login</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/register" className={pageLinkClass} onClick={closeMenus}>Register</NavLink>
                                        </li>
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