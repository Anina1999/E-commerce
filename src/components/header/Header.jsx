import { useEffect, useState } from "react";
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

function SectionLink({ id, label, activeSection, onSelect }) {
    return (
        <li className={styles.sectionLink}>
            <a
                href={`#${id}`}
                className={activeSection === id ? styles.active : undefined}
                onClick={() => onSelect(id)}
            >
                {label}
            </a>
        </li>
    );
}

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("top");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);


    const handleSectionSelect = (id) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    const toggleSubmenu = (name) => {
        setOpenSubmenu((current) => (
            current === name ? null : name
        ));
    };

    useEffect(() => {
        const handleScroll = () => {
            const banner = document.getElementById("top");
            const header = document.querySelector("header");
            const offset = (banner?.offsetHeight ?? 0) - (header?.offsetHeight ?? 0);

            setIsSticky(window.scrollY >= offset);

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
    }, []);

    return (
        <header className={isSticky ? `${styles.header} ${styles.sticky}` : styles.header}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className={styles.mainNav}>
                            <a href="index.html" className={styles.logo}>
                                <img src={logo} alt="Tourashop" />
                            </a>
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
                                            <a href="/about">About Us</a>
                                        </li>
                                        <li>
                                            <a href="/catalog">Catalog</a>
                                        </li>
                                        <li>
                                            <a href="/contact">Contact Us</a>
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
                                            <a href="/login">Login</a>
                                        </li>
                                        <li>
                                            <a href="/register">Register</a>
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