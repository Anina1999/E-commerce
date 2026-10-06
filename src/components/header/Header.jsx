import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";

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
        <li className="scroll-to-section">
            <a
                href={`#${id}`}
                className={activeSection === id ? "active" : undefined}
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
        <header className={`header-area header-sticky${isSticky ? " background-header" : ""}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            <a href="index.html" className="logo">
                                <img src={logo} alt="Tourashop" />
                            </a>
                            <ul className={`nav${isMenuOpen ? " active" : ""}`}>
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

                                <li className="submenu">
                                    <button
                                        type="button"
                                        className="submenu-toggle"
                                        aria-expanded={openSubmenu === "pages"}
                                        onClick={() => toggleSubmenu("pages")}
                                    >
                                        Pages
                                    </button>
                                    <ul className={openSubmenu === "pages" ? "active" : undefined}>
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
                                <li className="submenu">
                                    <button
                                        type="button"
                                        className="submenu-toggle"
                                        aria-expanded={openSubmenu === "account"}
                                        onClick={() => toggleSubmenu("account")}
                                    >
                                        Account
                                    </button>
                                    <ul className={openSubmenu === "account" ? "active" : undefined}>
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
                                className={`menu-trigger${isMenuOpen ? " active" : ""}`}
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