import { useEffect, useRef } from "react";
import ErrorMessage from "../error-message/ErrorMessage";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ title, message, confirmLabel, pending, error, onConfirm, onCancel }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        dialogRef.current.showModal();
    }, []);

    const escapeHandler = (e) => {
        e.preventDefault();

        if (!pending) {
            onCancel();
        }
    };

    const backdropClickHandler = (e) => {
        if (e.target === dialogRef.current && !pending) {
            onCancel();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.confirmModal}
            onCancel={escapeHandler}
            onClick={backdropClickHandler}
        >
            <div className={styles.content}>
                <h5>{title}</h5>
                <p>{message}</p>
                {error && <ErrorMessage variant="form" className={styles.error} message={error} />}
                <div className={styles.buttons}>
                    <button type="button" className={styles.cancel} onClick={onCancel} disabled={pending}>
                        Cancel
                    </button>
                    <button type="button" className={styles.confirm} onClick={onConfirm} disabled={pending}>
                        {pending ? "Please wait..." : confirmLabel}
                    </button>
                </div>
            </div>
        </dialog>
    );
}
