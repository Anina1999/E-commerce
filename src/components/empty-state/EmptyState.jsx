import styles from "./EmptyState.module.css";

export default function EmptyState({ message = "No items in this category" }) {
    return (
        <div className={styles.emptyState}>
            <i className="fa fa-inbox" aria-hidden="true" />
            <p>{message}</p>
        </div>
    );
}
