import type {GoogleBook} from "../redux/books/booksTypes.ts";

export const getFeaturedBooks = (
    books: GoogleBook[] | null | undefined,
    maxFeatured: number = 10
): GoogleBook[] => {
    if (!books || books.length === 0 || maxFeatured <= 0) return [];

    const forSale = books.filter(
        (book) => book.saleInfo.saleability === "FOR_SALE"
    );

    if (forSale.length === 0) {
        return books.slice(0, maxFeatured);
    }


    return [...forSale]
        .sort(
            (a, b) =>
                (b.volumeInfo.averageRating ?? 0) -
                (a.volumeInfo.averageRating ?? 0)
        )
        .slice(0, maxFeatured);
};

