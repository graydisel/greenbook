import type {BookState} from "./bookCartTypes.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Book} from "../../components/books.ts";

const initialState: BookState = {
    booksCart: []
}

const bookCartSlice = createSlice({
    name: "bookCart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Book>) => {
            const searchBook = state.booksCart.find(book => book.id === action.payload.id);
            if (searchBook) {
                searchBook.quantity++;
            } else {
                const newBook = {
                ...action.payload,
                quantity: 1,};
                state.booksCart.push(newBook);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.booksCart = state.booksCart.filter((book) => book.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const searchBook = state.booksCart.find(book => book.id === action.payload);
            if (searchBook) {
                searchBook.quantity++;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const searchBook = state.booksCart.find(book => book.id === action.payload);
            if (searchBook && searchBook.quantity > 1) {
                searchBook.quantity--;
            }
        },
        clearCart: (state) => {
            state.booksCart = [];
        }
    }
});

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = bookCartSlice.actions;
export default bookCartSlice.reducer;