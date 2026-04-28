import { describe, it, expect } from "vitest";
import type { GoogleBook } from "../redux/books/booksTypes";
import { getFeaturedBooks } from "./featuredBooksUtils";

const makeBook = (params: {
    id: string;
    saleability: string;
    rating?: number;
}): GoogleBook => {
    return {
        id: params.id,
        volumeInfo: {
            title: `Title ${params.id}`,
            authors: ["Author"],
            averageRating: params.rating,
        },
        saleInfo: {
            saleability: params.saleability,
            listPrice: params.saleability === "FOR_SALE" ? { amount: 10, currencyCode: "USD" } : undefined,
        },
    };
};

describe("getFeaturedBooks", () => {
    it("returns empty when input is null/undefined/empty", () => {
        expect(getFeaturedBooks(null, 10)).toEqual([]);
        expect(getFeaturedBooks(undefined, 10)).toEqual([]);
        expect(getFeaturedBooks([], 10)).toEqual([]);
    });

    it("returns empty when maxFeatured <= 0", () => {
        const books = [makeBook({ id: "1", saleability: "FOR_SALE", rating: 4 })];
        expect(getFeaturedBooks(books, 0)).toEqual([]);
        expect(getFeaturedBooks(books, -1)).toEqual([]);
    });

    it("filters to FOR_SALE, sorts by rating desc, and limits results", () => {
        const books = [
            makeBook({ id: "a", saleability: "NOT_FOR_SALE", rating: 100 }),
            makeBook({ id: "b", saleability: "FOR_SALE", rating: 3 }),
            makeBook({ id: "c", saleability: "FOR_SALE", rating: 9 }),
            makeBook({ id: "d", saleability: "FOR_SALE", rating: 1 }),
        ];

        const result = getFeaturedBooks(books, 2);
        expect(result.map((b) => b.id)).toEqual(["c", "b"]);
    });

    it("falls back to first N books when no FOR_SALE books exist", () => {
        const books = [
            makeBook({ id: "a", saleability: "NOT_FOR_SALE", rating: 5 }),
            makeBook({ id: "b", saleability: "NOT_FOR_SALE", rating: 10 }),
            makeBook({ id: "c", saleability: "NOT_FOR_SALE", rating: 1 }),
        ];


        const result = getFeaturedBooks(books, 2);
        expect(result.map((b) => b.id)).toEqual(["a", "b"]);
    });
});

