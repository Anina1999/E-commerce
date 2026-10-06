import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import SubscribeSection from "../../components/subscribe-section/SubscribeSection";
import styles from "./Contact.module.css";

export default function Contact() {
    return (
        <>
            <PageHeading
                variant="contact"
                title="Contact Us"
                subtitle="Questions about gear, orders or trips? Write to us."
            />

            <div className={styles.contactUs}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.map}>
                                <iframe
                                    src="https://maps.google.com/maps?q=Boulder,CO&z=13&output=embed"
                                    width="100%"
                                    height="400px"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    title="Tourashop on the map"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <SectionHeading
                                title="Say Hello. Don't Be Shy!"
                                subtitle="We usually reply within one working day."
                            />
                            <form id="contact" action="" method="post">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <input name="name" type="text" id="contact-name" placeholder="Your name" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <input name="email" type="email" id="contact-email" placeholder="Your email" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea name="message" rows="6" id="message" placeholder="Your message" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button type="submit">
                                                <i className="fa fa-paper-plane" />
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <SubscribeSection />
        </>
    );
}
