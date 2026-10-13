import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import SectionHeading from "../../components/section-heading/SectionHeading";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrorMessage";
import styles from "./Auth.module.css";

const initialValues = {
    email: "",
    password: "",
};

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const loginSubmitHandler = async (values) => {
        setError("");
        setPending(true);

        try {
            await login(values.email, values.password);
            navigate(location.state?.from || "/");
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setPending(false);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, loginSubmitHandler);

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
                                    <input
                                        name="email"
                                        type="email"
                                        id="email"
                                        placeholder="Your email"
                                        value={values.email}
                                        onChange={changeHandler}
                                        required
                                    />
                                </fieldset>
                                <fieldset>
                                    <input
                                        name="password"
                                        type="password"
                                        id="password"
                                        placeholder="Your password"
                                        value={values.password}
                                        onChange={changeHandler}
                                        required
                                    />
                                </fieldset>
                                {error && <ErrorMessage variant="form" className={styles.error} message={error} />}
                                <fieldset>
                                    <button type="submit" disabled={pending}>
                                        {pending ? "Please wait..." : "Login"}
                                    </button>
                                </fieldset>
                                <p className={styles.switch}>
                                    Don't have an account? <Link to="/register" state={location.state}>Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
