import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {addToCart} from "../redux/bookCart/bookCartSlice.ts";
import {useEffect} from "react";
import {fetchBooks} from "../redux/books/booksSlice.ts";
import {booksSelector, loadedBooksSelector} from "../redux/books/booksSelectors.ts";
import {BookCard} from "../components/common/BookCard.tsx";
import type {GoogleBook} from "../redux/books/booksTypes.ts";
import {Alert, Box, CircularProgress, Container, Grid} from "@mui/material";


export const Books = () => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector(loadedBooksSelector);
    const {loading, error} = useSelector(booksSelector);

    useEffect(() => {
        if (!books || books.length === 0) {
            dispatch(fetchBooks({quantity: 30}));
        }
    }, [dispatch, books]);

    function handleAddBook(book: GoogleBook) {
        dispatch(addToCart(book))
    }

    if (!books && !loading) {
        return (
            <>
                <div>No Books Available</div>
                <div style={{margin: "20px"}}>
                    <Link to={'/'}><button>Back</button></Link>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <Alert severity="error">Error with loading books</Alert>
        )
    }

    return (
        <Container>
            <h3>List of the Books</h3>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
                    <CircularProgress />
                </Box>
            )}
            <Grid container spacing={2}>
                {books && books.map((book) => (
                    <Grid key={book.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                        <BookCard book={book} onAddBook={handleAddBook}/>
                    </Grid>
                ))}
            </Grid>
            <div style={{margin: "20px"}}>
                <Link to={'/'}><button>Back</button></Link>
            </div>
        </Container>
    )
}