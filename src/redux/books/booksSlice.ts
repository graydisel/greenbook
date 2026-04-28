import type {BooksState, GoogleBook, GoogleBooksResponse} from "./booksTypes.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


type FetchBooksArgs = {
    quantity: number;
    query?: string;
    orderBy?: "relevance" | "newest";
};

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.error?.message || error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unknown error occurred";
};

const buildBooksUrl = ({quantity, query = "subject:fiction", orderBy = "relevance"}: FetchBooksArgs): string => {
    const apiKey = import.meta.env.VITE_BOOK_API_KEY;
    const safeQuery = query.includes('subject:') ? query : `intitle:${query}`;
    const params = new URLSearchParams({
        q: safeQuery,
        orderBy,
        country: "US",
        maxResults: String(Math.min(quantity, 40)),
        printType: "books",
    });

    if (apiKey) {
        params.set("key", apiKey);
    }


    return `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;
};

export const fetchBooks = createAsyncThunk<GoogleBooksResponse, FetchBooksArgs, { rejectValue: string }>('books/fetchBooks',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get(buildBooksUrl(payload));
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
    );

export const fetchBookById = createAsyncThunk<GoogleBook, string, { rejectValue: string }>(
    "books/fetchBookById",
    async (bookId, { rejectWithValue }) => {
        try {
            const apiKey = import.meta.env.VITE_BOOK_API_KEY;
            const params = new URLSearchParams();
            if (apiKey) {
                params.set("key", apiKey);
            }

            const queryPart = params.toString() ? `?${params.toString()}` : "";
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}${queryPart}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

const initialState: BooksState = {
    booksResponse: null,
    loading: false,
    error: null,
    selectedBook: null,
    selectedBookLoading: false,
    selectedBookError: null,
}

const books = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<GoogleBooksResponse>) => {
                state.loading = false;
                state.booksResponse = {
                    kind: action.payload.kind,
                    totalItems: action.payload.totalItems,
                    items: action.payload.items
                };
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to load books.';
            })
            .addCase(fetchBookById.pending, (state) => {
                state.selectedBookLoading = true;
                state.selectedBookError = null;
            })
            .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<GoogleBook>) => {
                state.selectedBookLoading = false;
                state.selectedBook = action.payload;
            })
            .addCase(fetchBookById.rejected, (state, action) => {
                state.selectedBookLoading = false;
                state.selectedBookError = action.payload as string || "Failed to load book details.";
            })
    }
})

export default books.reducer;