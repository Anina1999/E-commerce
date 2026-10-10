import { useState } from "react";
import useForm from "../../hooks/useForm";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import SubscribeSection from "../../components/subscribe-section/SubscribeSection";
import styles from "./Contact.module.css";

const initialValues = {
    name: '',
    email: '',
    message: '',
};

export default function Contact() {
    const [sent, setSent] = useState(false);
    const { values, changeHandler, submitHandler } = useForm(initialValues, () => setSent(true));

    return (
        <>
            <PageHeading
                variant="contact"
                title="Contact Us"
                subtitle="Questions about gear, orders or trips? Write to us."
            />

            <div className={`ridge-section ${styles.contactUs}`}>
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
                                className={styles.heading}
                                title="Say Hello. Don't Be Shy!"
                                subtitle="We usually reply within one working day."
                            />
                            <form id="contact" onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <input name="name" type="text" id="contact-name" placeholder="Your name" value={values.name} onChange={changeHandler} required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <input name="email" type="email" id="contact-email" placeholder="Your email" value={values.email} onChange={changeHandler} required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea name="message" rows="6" id="message" placeholder="Your message" value={values.message} onChange={changeHandler} required />
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
                                {sent && <p className={styles.success}>Thank you! We will reply within one working day.</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <SubscribeSection />
        </>
    );
}
