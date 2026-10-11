export function paginate(items, page, perPage) {
    const start = (page - 1) * perPage;

    return {
        pageItems: items.slice(start, start + perPage),
        pageCount: Math.ceil(items.length / perPage),
    };
}
