import { Link } from "react-router";
import PageHeading from "../../components/page-heading/PageHeading";
import styles from "./NotFound.module.css";


export default function NotFound() {
    return (
        <>
            <PageHeading
                variant="notFound"
                title="404 - Page Not Found"
                subtitle="Looks like this trail doesn't exist."
            />

            <div className={`container text-center ${styles.actions}`}>
                <div className="main-border-button main-teal-button">
                    <Link to="/">Back to Homepage</Link>
                </div>
            </div>
        </>
    );
}
