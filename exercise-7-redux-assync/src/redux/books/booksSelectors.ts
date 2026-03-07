import type {RootState} from "../store.ts";

export const booksSelector = (state: RootState) => state.books;

export const loadedBooksSelector = (state: RootState) => state.books.booksResponse?.items;