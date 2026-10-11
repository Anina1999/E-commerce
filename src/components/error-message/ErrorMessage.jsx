import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({
    message = "Something went wrong while loading. Please try again later.",
    variant,
    className
}) {
    const rootClassName = [styles.errorMessage, styles[variant], className].filter(Boolean).join(" ");

    return (
        <div className={rootClassName} role="alert">
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}
