export function getRating(reviews) {
    const ratings = reviews.filter((review) => !review.is_hidden).map((review) => review.rating);

    if (ratings.length === 0) {
        return { average: 0, count: 0 };
    }

    return { average: ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length, count: ratings.length };
}
