import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message = "Something went wrong while loading. Please try again later." }) {
    return (
        <div className={styles.errorMessage} role="alert">
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}
