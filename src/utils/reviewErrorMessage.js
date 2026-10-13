export function getReviewErrorMessage(error) {
    if (error.code === "23505") {
        return "You have already reviewed this product.";
    }

    return "Could not post your review. Please try again.";
}
