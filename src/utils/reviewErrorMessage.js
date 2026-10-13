export function getReviewErrorMessage(error) {
    if (error.code === "23505") {
        return "You have already reviewed this product.";
    }

    if (error.code === "PGRST116") {
        return "Something went wrong. Please refresh the page.";
    }

    return "Could not save your review. Please try again.";
}
