import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { categories } from "../../data/categories";
import { socialLinks } from "../../data/socialLinks";
import logo from "../../assets/logo-white.svg";
import styles from "./Footer.module.css";

export default function Footer() {
    const { isAuthenticated, isAdmin } = useAuth();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div>
                            <div className={styles.logo}>
                                <img src={logo} alt="Tourashop" />
                            </div>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=12+Trailhead+Road,+Boulder,+CO+80302"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        12 Trailhead Road, Boulder, CO 80302
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:tourashop@gmail.com">tourashop@gmail.com</a>
                                </li>
                                <li>
                                    <a href="tel:0100200340">010-020-0340</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h4>Shop by Activity</h4>
                        <ul>
                            {categories.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/catalog/${item.id}`}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h4>Useful Links</h4>
                        <ul>
                            <li>
                                <Link to="/">Homepage</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/catalog">Catalog</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h4>My Account</h4>
                        <ul>
                            {!isAuthenticated && (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link to="/favorites">Favorites</Link>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <Link to="/orders">My Orders</Link>
                                </li>
                            )}
                            {isAdmin && (
                                <li>
                                    <Link to="/admin/products">Admin Panel</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-12">
                        <div className={styles.underFooter}>
                            <p>
                                Copyright © 2026 Tourashop. All Rights Reserved.
                                <br />
                                Design:{" "}
                                <a
                                    href="https://templatemo.com"
                                    target="_parent"
                                    title="free css templates"
                                >
                                    TemplateMo
                                </a>
                                <br />
                                Distributed By:{" "}
                                <a
                                    href="https://themewagon.com"
                                    target="_blank"
                                    title="free & premium responsive templates"
                                >
                                    ThemeWagon
                                </a>
                            </p>
                            <ul>
                                {socialLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.url} aria-label={link.name}>
                                            <i className={link.icon} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
