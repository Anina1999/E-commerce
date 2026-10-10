import { Link } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import styles from "./Auth.module.css";

export default function Register() {
    return (
        <>
            <PageHeading
                variant="auth"
                title="Register"
                subtitle="Join Tourashop and keep your gear in one place."
            />

            <div className={`ridge-section ${styles.auth}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <SectionHeading
                                className={styles.heading}
                                title="Create Your Account"
                                subtitle="Save your favorites and track your orders."
                            />
                            <form id="register">
                                <fieldset>
                                    <input name="username" type="text" id="username" placeholder="Your username" required />
                                </fieldset>
                                <fieldset>
                                    <input name="email" type="email" id="email" placeholder="Your email" required />
                                </fieldset>
                                <fieldset>
                                    <input name="password" type="password" id="password" placeholder="Your password" required />
                                </fieldset>
                                <fieldset>
                                    <input name="rePassword" type="password" id="rePassword" placeholder="Repeat your password" required />
                                </fieldset>
                                <fieldset>
                                    <button type="submit">Register</button>
                                </fieldset>
                                <p className={styles.switch}>
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
