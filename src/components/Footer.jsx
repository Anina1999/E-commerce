import logo from "../assets/logo-white.svg";

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
                                    <a href="#">12 Trailhead Road, Boulder, CO 80302</a>
                                </li>
                                <li>
                                    <a href="#">hello@yourstore.com</a>
                                </li>
                                <li>
                                    <a href="#">010-020-0340</a>
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
                                <a href="#">Homepage</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Help</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h4>Help &amp; Information</h4>
                        <ul>
                            <li>
                                <a href="#">Help</a>
                            </li>
                            <li>
                                <a href="#">FAQ's</a>
                            </li>
                            <li>
                                <a href="#">Shipping</a>
                            </li>
                            <li>
                                <a href="#">Tracking ID</a>
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
