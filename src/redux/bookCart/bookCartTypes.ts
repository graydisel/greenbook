import type {GoogleBook} from "../books/booksTypes.ts";

export interface BookCartType extends GoogleBook {
        quantity: number;
}

export type BookCartState = {
    booksCart: BookCartType[];
}