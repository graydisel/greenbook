import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import type {AppDispatch} from "../redux/store.ts";
import {booksSelector, loadedBooksSelector} from "../redux/books/booksSelectors.ts";
import {fetchBooks} from "../redux/books/booksSlice.ts";
import {BookCard} from "../components/common/BookCard.tsx";
import {addToCart} from "../redux/bookCart/bookCartSlice.ts";
import type {GoogleBook} from "../redux/books/booksTypes.ts";
import {Link as RouterLink} from "react-router-dom";
import {designTokens} from "../assets/style/variables.ts";

const genreFilters = [
    {label: "Fiction", query: "subject:fiction"},
    {label: "Science", query: "subject:science"},
    {label: "History", query: "subject:history"},
];

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector(loadedBooksSelector) ?? [];
    const {loading, error} = useSelector(booksSelector);
    const [activeGenreQuery, setActiveGenreQuery] = useState(genreFilters[0].query);

    useEffect(() => {
        dispatch(fetchBooks({quantity: 18, query: activeGenreQuery, orderBy: "relevance"}));
    }, [activeGenreQuery, dispatch]);

    const featuredBooks = useMemo(() => {
        return [...books]
            .sort((a, b) => (b.volumeInfo.averageRating ?? 0) - (a.volumeInfo.averageRating ?? 0))
            .slice(0, 6);
    }, [books]);

    const handleAddBook = (book: GoogleBook) => {
        dispatch(addToCart(book));
    };

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', gap: '2rem', py: 3, px: {xs: '10px', md: '20px'}}}>
            <Box
                sx={{
                    borderRadius: designTokens.radius.hero,
                    p: {xs: 3, md: 6},
                    background: designTokens.gradient.homeHero,
                    color: designTokens.color.heroText,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h3" sx={{fontWeight: 700}}>
                    Найди свою следующую историю
                </Typography>
                <Typography variant="body1" sx={{maxWidth: 520}}>
                    Подборки бестселлеров, художественная литература и научно-популярные книги в одном месте.
                </Typography>
                <Box>
                    <Button component={RouterLink} to="/books" variant="contained" color="warning">
                        Смотреть каталог
                    </Button>
                </Box>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                <Typography variant="h5" sx={{fontWeight: 600}}>
                    Жанры
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

            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Typography variant="h5" sx={{fontWeight: 600}}>
                    Featured books
                </Typography>

                {loading && (
                    <Box sx={{display: "flex", justifyContent: "center", py: 8}}>
                        <CircularProgress/>
                    </Box>
                )}

                {!loading && error && (
                    <Alert severity="error">
                        Error loading featured books: {error}
                    </Alert>
                )}

                {!loading && !error && featuredBooks.length === 0 && (
                    <Alert severity="info">
                        No featured books available right now.
                    </Alert>
                )}

                {!loading && !error && featuredBooks.length > 0 && (
                    <Grid container spacing={2}>
                        {featuredBooks.map((book) => (
                            <Grid key={book.id} size={{xs: 12, sm: 6, md: 4}}>
                                <BookCard book={book} onAddBook={handleAddBook}/>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    )
}
