export interface GoogleBook {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        pageCount?: number;
        averageRating?: number;
        imageLinks?: {
            thumbnail: string;
            smallThumbnail: string;
        };
    };
    saleInfo: {
        saleability: string;
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
    };
}

export interface GoogleBooksResponse {
    kind: string;
    totalItems: number;
    items: GoogleBook[];
}

export interface BooksState {
    booksResponse: GoogleBooksResponse | null;
    loading: boolean;
    error: string | null;
}