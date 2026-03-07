import {configureStore} from "@reduxjs/toolkit";
import bookCartSlice from "./bookCart/bookCartSlice.ts";
import booksSlice from "./books/booksSlice.ts";

export const store = configureStore({
    reducer: {
        books: booksSlice,
        cart: bookCartSlice,
    }
});
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("greenbook_cart", JSON.stringify(state.cart.booksCart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;