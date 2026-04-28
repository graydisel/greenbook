import { createSelector } from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

export const booksSelector = (state: RootState) => state.books;

const selectAllBooksRaw = (state: RootState) => state.books.booksResponse?.items;

export const selectFeaturedBooks = createSelector(
    [selectAllBooksRaw],
    (items) => {
      if (!items) return []; 
  
      return [...items]
        .sort((a, b) => (b.volumeInfo.averageRating ?? 0) - (a.volumeInfo.averageRating ?? 0))
        .slice(0, 6);
    }
  );
export const loadedBooksSelector = (state: RootState) => state.books.booksResponse?.items;

export const selectedBookSelector = (state: RootState) => state.books.selectedBook;

export const selectedBookLoadingSelector = (state: RootState) => state.books.selectedBookLoading;

export const selectedBookErrorSelector = (state: RootState) => state.books.selectedBookError;
