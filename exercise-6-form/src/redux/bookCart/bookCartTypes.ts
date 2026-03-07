import type {Book} from "../../components/books.ts";

export interface BookCartType extends Book{
        quantity: number;
}

export type BookState = {
    booksCart: BookCartType[];
}