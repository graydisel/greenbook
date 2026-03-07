import type {BooksState, GoogleBooksResponse} from "./booksTypes.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBooks = createAsyncThunk<GoogleBooksResponse, {quantity: number}, { rejectValue: string }>('books/fetchBooks',
    async ({quantity}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&country=US&maxResults=${quantity}&key=${import.meta.env.VITE_BOOK_API_KEY}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'An unknown error occurred';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.error?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return rejectWithValue(errorMessage);
        }
    }
    );

const initialState: BooksState = {
    booksResponse: null,
    loading: false,
    error: null,
}

const books = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
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
    }
})

export default books.reducer;