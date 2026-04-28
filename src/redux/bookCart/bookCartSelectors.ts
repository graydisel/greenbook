import type {RootState} from "../store.ts";


export const booksListSelector = (state: RootState)=> state.cart.booksCart;

export const totalQuantitySelector = (state: RootState) => state.cart.booksCart.reduce((acc, cur) => acc + cur.quantity, 0);

export const totalPriceSelector = (state: RootState) => state.cart.booksCart.reduce((acc, cur) => acc + (cur.saleInfo.listPrice?.amount || 0) * cur.quantity, 0);