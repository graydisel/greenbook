import {configureStore} from "@reduxjs/toolkit";
import bookCartSlice from "./bookCart/bookCartSlice.ts";
import booksSlice from "./books/booksSlice.ts";
import { CART_STORAGE_KEY } from "./bookCart/bookCartSlice.ts";
import notificationSlice from "./notification/notificationSlice.ts";

export const store = configureStore({
    reducer: {
        books: booksSlice,
        cart: bookCartSlice,
        notification: notificationSlice,
    }
});
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.booksCart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;