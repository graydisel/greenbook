import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BookCartState, BookCartType} from "./bookCartTypes.ts";
import type {GoogleBook} from "../books/booksTypes.ts";

const KEY = "greenbook_cart";

const loadCart = (): BookCartType[] => {
    try {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(e);
        return [];
    }
};

const initialState: BookCartState = {
    booksCart: loadCart()
}

const bookCartSlice = createSlice({
    name: "bookCart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<GoogleBook>) => {
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
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.booksCart = state.booksCart.filter((book) => book.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const searchBook = state.booksCart.find(book => book.id === action.payload);
            if (searchBook) {
                searchBook.quantity++;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
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