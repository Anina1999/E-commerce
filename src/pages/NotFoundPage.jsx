import { Link } from "react-router";
import PageHeading from "../components/PageHeading";


export default function NotFoundPage() {
    return (
        <>
            <PageHeading
                className="page-heading not-found-page-heading"
                title="404 - Page Not Found"
                subtitle="Looks like this trail doesn't exist."
            />

            <div className="container text-center" style={{ marginBottom: 80 }}>
                <div className="main-border-button main-teal-button">
                    <Link to="/">Back to Homepage</Link>
                </div>
            </div>
        </>
    );
}
