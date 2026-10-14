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
    username: "",
    email: "",
    password: "",
    rePassword: "",
};

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const registerSubmitHandler = async (values) => {
        if (values.password !== values.rePassword) {
            setError("Passwords don't match.");
            return;
        }

        setError("");
        setPending(true);

        try {
            await register(values.username, values.email, values.password);
            navigate(location.state?.from || "/");
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setPending(false);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, registerSubmitHandler);

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
                            {location.state?.message && (
                                <p className={styles.notice}>
                                    <i className="fa fa-info-circle" aria-hidden="true" />
                                    {location.state.message}
                                </p>
                            )}
                            <form id="register" onSubmit={submitHandler}>
                                <fieldset>
                                    <input
                                        name="username"
                                        type="text"
                                        id="username"
                                        placeholder="Your username"
                                        value={values.username}
                                        onChange={changeHandler}
                                        required
                                    />
                                </fieldset>
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
                                        minLength={6}
                                        value={values.password}
                                        onChange={changeHandler}
                                        required
                                    />
                                </fieldset>
                                <fieldset>
                                    <input
                                        name="rePassword"
                                        type="password"
                                        id="rePassword"
                                        placeholder="Repeat your password"
                                        value={values.rePassword}
                                        onChange={changeHandler}
                                        required
                                    />
                                </fieldset>
                                {error && <ErrorMessage variant="form" className={styles.error} message={error} />}
                                <fieldset>
                                    <button type="submit" disabled={pending}>
                                        {pending ? "Please wait..." : "Register"}
                                    </button>
                                </fieldset>
                                <p className={styles.switch}>
                                    Already have an account? <Link to="/login" state={location.state}>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
