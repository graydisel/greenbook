import {configureStore} from "@reduxjs/toolkit";
import bookCartSlice from "./bookCart/bookCartSlice.ts";

export const store = configureStore({
    reducer: {
        cart: bookCartSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;