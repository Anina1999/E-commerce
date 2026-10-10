import { Link } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import styles from "./Auth.module.css";

export default function Login() {
    return (
        <>
            <PageHeading
                variant="auth"
                title="Login"
                subtitle="Welcome back to Tourashop."
            />

            <div className={`ridge-section ${styles.auth}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <SectionHeading
                                className={styles.heading}
                                title="Sign In To Your Account"
                                subtitle="Your cart and favorites are waiting for you."
                            />
                            <form id="login">
                                <fieldset>
                                    <input name="email" type="email" id="email" placeholder="Your email" required />
                                </fieldset>
                                <fieldset>
                                    <input name="password" type="password" id="password" placeholder="Your password" required />
                                </fieldset>
                                <fieldset>
                                    <button type="submit">Login</button>
                                </fieldset>
                                <p className={styles.switch}>
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
