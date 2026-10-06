import logo from "../../assets/logo-white.svg";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="first-item">
                            <div className="logo">
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
                            <li>
                                <a href="#hiking">Hiking</a>
                            </li>
                            <li>
                                <a href="#running">Running</a>
                            </li>
                            <li>
                                <a href="#biking">Biking</a>
                            </li>
                            <li>
                                <a href="#climbing">Climbing</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h4>Useful Links</h4>
                        <ul>
                            <li>
                                <a href="#top">Homepage</a>
                            </li>
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
                    </div>
                    <div className="col-lg-3">
                        <h4>My Account</h4>
                        <ul>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/register">Register</a>
                            </li>
                            <li>
                                <a href="/favorites">Favorites</a>
                            </li>
                            <li>
                                <a href="/orders">My Orders</a>
                            </li>
                            <li>
                                <a href="/cart">Cart</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-12">
                        <div className="under-footer">
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
                                <li>
                                    <a href="https://www.instagram.com" aria-label="Instagram">
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com" aria-label="Facebook">
                                        <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com" aria-label="YouTube">
                                        <i className="fa fa-youtube-play" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
