import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BookCartState, BookCartType} from "./bookCartTypes.ts";
import type {GoogleBook} from "../books/booksTypes.ts";
import {ensureBookHasDisplayPrice} from "../../utils/bookPricing.ts";

export const CART_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const loadCart = (): BookCartType[] => {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        if (!data) {
            return [];
        }

        const parsedCart = JSON.parse(data) as BookCartType[];
        return parsedCart.map((book) => ensureBookHasDisplayPrice(book));
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
            const normalizedBook = ensureBookHasDisplayPrice(action.payload);
            const searchBook = state.booksCart.find(book => book.id === normalizedBook.id);
            if (searchBook) {
                searchBook.quantity++;
            } else {
                const newBook = {
                ...normalizedBook,
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
            } else {
                state.booksCart = state.booksCart.filter((book) => book.id !== action.payload);
            }
        
        },
        clearCart: (state) => {
            state.booksCart = [];
        }
    }
});

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = bookCartSlice.actions;
export default bookCartSlice.reducer;