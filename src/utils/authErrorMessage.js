export function getAuthErrorMessage(error) {
    if (error.name === "AuthRetryableFetchError") {
        return "Could not reach the server. Please try again.";
    }

    return error.message;
}
