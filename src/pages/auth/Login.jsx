import { Link } from "react-router";
import useForm from "../../hooks/useForm";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import styles from "./Auth.module.css";

const initialValues = {
    email: '',
    password: '',
};

export default function Login() {
    const { values, changeHandler, submitHandler } = useForm(initialValues, (values) => console.log(values));

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
                            <form id="login" onSubmit={submitHandler}>
                                <fieldset>
                                    <input name="email" type="email" id="email" placeholder="Your email" value={values.email} onChange={changeHandler} required />
                                </fieldset>
                                <fieldset>
                                    <input name="password" type="password" id="password" placeholder="Your password" value={values.password} onChange={changeHandler} required />
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
