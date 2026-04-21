import type {RootState} from "../store.ts";

export const booksSelector = (state: RootState) => state.books;

export const loadedBooksSelector = (state: RootState) => state.books.booksResponse?.items;

export const selectedBookSelector = (state: RootState) => state.books.selectedBook;

export const selectedBookLoadingSelector = (state: RootState) => state.books.selectedBookLoading;

export const selectedBookErrorSelector = (state: RootState) => state.books.selectedBookError;