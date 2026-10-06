import SectionHeading from "../section-heading/SectionHeading";

export default function SubscribeSection() {
    return (
        <div className="subscribe">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <SectionHeading
                            eyebrow="Newsletter"
                            title="Subscribe To Our Newsletter And Get 30% Off Your First Order"
                            subtitle="New gear drops, trail tips and member-only deals, straight to your inbox."
                        />
                        <form id="subscribe" action="" method="get">
                            <div className="row">
                                <div className="col-lg-5">
                                    <fieldset>
                                        <input
                                            name="name"
                                            type="text"
                                            id="name"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </fieldset>
                                </div>
                                <div className="col-lg-5">
                                    <fieldset>
                                        <input
                                            name="email"
                                            type="email"
                                            id="email"
                                            placeholder="Your Email Address"
                                            required
                                        />
                                    </fieldset>
                                </div>
                                <div className="col-lg-2">
                                    <fieldset>
                                        <button
                                            type="submit"
                                            id="form-submit"
                                            className="main-dark-button"
                                        >
                                            <i className="fa fa-paper-plane" />
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-6">
                                <ul>
                                    <li>
                                        Store Location:
                                        <br />
                                        <span>12 Trailhead Road, Boulder, CO 80302</span>
                                    </li>
                                    <li>
                                        Phone:
                                        <br />
                                        <span>010-020-0340</span>
                                    </li>
                                    <li>
                                        Office Location:
                                        <br />
                                        <span>Boulder, Colorado</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul>
                                    <li>
                                        Work Hours:
                                        <br />
                                        <span>08:00 AM - 8:00 PM Daily</span>
                                    </li>
                                    <li>
                                        Email:
                                        <br />
                                        <span>tourashop@gmail.com</span>
                                    </li>
                                    <li>
                                        Social Media:
                                        <br />
                                        <span>
                                            <a href="https://www.instagram.com">Instagram</a>,{" "}
                                            <a href="https://www.facebook.com">Facebook</a>,{" "}
                                            <a href="https://www.tiktok.com">TikTok</a>,{" "}
                                            <a href="https://www.youtube.com">YouTube</a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
