import type {GoogleBook} from "../redux/books/booksTypes.ts";

const DEFAULT_CURRENCY = "USD";

const getGeneratedPriceValue = (bookId: string): number => {
    return Number((((bookId.charCodeAt(0) + bookId.length) % 21) + 8.99).toFixed(2));
};

export const ensureBookHasDisplayPrice = <T extends GoogleBook>(book: T): T => {
    if (book.saleInfo.listPrice?.amount) {
        return book;
    }

    return {
        ...book,
        saleInfo: {
            ...book.saleInfo,
            listPrice: {
                amount: getGeneratedPriceValue(book.id),
                currencyCode: book.saleInfo.listPrice?.currencyCode ?? DEFAULT_CURRENCY,
            },
        },
    };
};

export const getBookDisplayPrice = (book: GoogleBook): string => {
    const withPrice = ensureBookHasDisplayPrice(book);
    const amount = withPrice.saleInfo.listPrice?.amount ?? getGeneratedPriceValue(book.id);

    return `${amount.toFixed(2)} $`;
};
