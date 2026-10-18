import ErrorMessage from "../error-message/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import useFavorites from "../../hooks/useFavorites";

export default function AppAlerts({ className }) {
    const { profileError } = useAuth();
    const { error: favoritesError, updateError: favoritesUpdateError } = useFavorites();

    let message = null;

    if (profileError) {
        message = "We couldn't load your account. Please refresh the page.";
    } else if (favoritesUpdateError) {
        message = "Could not update your favorites. Please try again.";
    } else if (favoritesError) {
        message = "We couldn't load your favorites. Please refresh the page.";
    }

    if (!message) {
        return null;
    }

    return <ErrorMessage variant="banner" className={className} message={message} />;
}
