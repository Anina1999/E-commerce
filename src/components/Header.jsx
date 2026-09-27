import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";

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

    const handleSectionSelect = (id) => {
        setActiveSection(id);
        setIsMenuOpen(false);
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
                                    <a href="#">Pages</a>
                                    <ul>
                                        <li>
                                            <a href="about.html">About Us</a>
                                        </li>
                                        <li>
                                            <a href="products.html">Products</a>
                                        </li>
                                        <li>
                                            <a href="single-product.html">Single Product</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact Us</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="submenu">
                                    <a href="#">Features</a>
                                    <ul>
                                        <li>
                                            <a href="#">Features Page 1</a>
                                        </li>
                                        <li>
                                            <a href="#">Features Page 2</a>
                                        </li>
                                        <li>
                                            <a href="#">Features Page 3</a>
                                        </li>
                                        <li>
                                            <a
                                                rel="nofollow"
                                                href="https://templatemo.com/page/4"
                                                target="_blank"
                                            >
                                                Template Page 4
                                            </a>
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