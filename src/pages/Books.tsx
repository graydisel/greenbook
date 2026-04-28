import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {addToCart} from "../redux/bookCart/bookCartSlice.ts";
import {useEffect, useState} from "react";
import {fetchBooks} from "../redux/books/booksSlice.ts";
import {booksSelector, loadedBooksSelector} from "../redux/books/booksSelectors.ts";
import {BookCard} from "../components/common/BookCard.tsx";
import type {GoogleBook} from "../redux/books/booksTypes.ts";
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {designTokens} from "../assets/style/variables.ts";
import {addNotification} from "../redux/notification/notificationSlice.ts";

const genreFilters = [
    {label: "Fiction", query: "subject:fiction"},
    {label: "Science", query: "subject:science"},
    {label: "History", query: "subject:history"},
    {label: "Bestsellers", query: "bestsellers"},
];

export const Books = () => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector(loadedBooksSelector) ?? [];
    const {loading, error} = useSelector(booksSelector);
    const [activeGenreQuery, setActiveGenreQuery] = useState(genreFilters[0].query);

    useEffect(() => {
        dispatch(fetchBooks({quantity: 30, query: activeGenreQuery, orderBy: "relevance"}));
    }, [activeGenreQuery, dispatch]);

    function handleAddBook(book: GoogleBook) {
        dispatch(addToCart(book))
        dispatch(
            addNotification({
                message: `"${book.volumeInfo.title}" added to cart`,
                severity: "success",
                autoHideDuration: 2500,
            })
        );
    }

    return (
        <Container sx={{py: 3, display: "flex", flexDirection: "column", gap: 2}}>
            <Box
                sx={{
                    borderRadius: designTokens.radius.hero,
                    p: {xs: 3, md: 5},
                    background: designTokens.gradient.booksHero,
                    color: designTokens.color.heroText,
                }}
            >
                <Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
                    Books Catalog
                </Typography>
                <Typography variant="body1" sx={{maxWidth: 600, opacity: 0.9}}>
                    Choose a genre and add interesting books to your cart.
                </Typography>
                <Button component={RouterLink} to="/" variant="outlined" color="inherit" sx={{mt: 2}}>
                    Back to home
                </Button>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                <Typography variant="h6" sx={{fontWeight: 600}}>
                    Quick filters
                </Typography>
                <Stack direction="row" spacing={1} sx={{flexWrap: "wrap"}}>
                    {genreFilters.map((genre) => (
                        <Chip
                            key={genre.query}
                            label={genre.label}
                            clickable
                            color={genre.query === activeGenreQuery ? "success" : "default"}
                            variant={genre.query === activeGenreQuery ? "filled" : "outlined"}
                            onClick={() => setActiveGenreQuery(genre.query)}
                            sx={{mb: 1}}
                        />
                    ))}
                </Stack>
            </Box>

            {error && (
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={() => dispatch(fetchBooks({quantity: 30, query: activeGenreQuery, orderBy: "relevance"}))}
                        >
                            Retry
                        </Button>
                    }
                >
                    Error with loading books: {error}
                </Alert>
            )}

            {!loading && !error && books.length === 0 && (
                <Alert severity="info">No books available for this genre right now.</Alert>
            )}

            {loading && (
                <Grid container spacing={2}>
                    {Array.from({length: 8}).map((_, index) => (
                        <Grid key={`skeleton-${index}`} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                            <Box sx={{borderRadius: designTokens.radius.card, border: `1px solid ${designTokens.color.skeletonBorder}`, p: 1}}>
                                <Skeleton variant="rectangular" height={240} sx={{borderRadius: designTokens.radius.media}}/>
                                <Skeleton sx={{mt: 1}} height={34}/>
                                <Skeleton width="70%" />
                                <Skeleton width="40%" />
                                <Skeleton width="45%" sx={{mt: 1}}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {!loading && !error && books.length > 0 && (
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                        Found books: {books.length}
                    </Typography>
                    <Grid container spacing={2}>
                        {books.map((book) => (
                            <Grid key={book.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                                <BookCard book={book} onAddBook={handleAddBook}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    )
}