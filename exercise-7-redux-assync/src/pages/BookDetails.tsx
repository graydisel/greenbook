import {useEffect, useMemo} from "react";
import {Link as RouterLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import type {AppDispatch} from "../redux/store.ts";
import {
    loadedBooksSelector,
    selectedBookErrorSelector,
    selectedBookLoadingSelector,
    selectedBookSelector
} from "../redux/books/booksSelectors.ts";
import {fetchBookById} from "../redux/books/booksSlice.ts";
import {addToCart} from "../redux/bookCart/bookCartSlice.ts";
import {designTokens} from "../assets/style/variables.ts";

export const BookDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const selectedBook = useSelector(selectedBookSelector);
    const selectedBookLoading = useSelector(selectedBookLoadingSelector);
    const selectedBookError = useSelector(selectedBookErrorSelector);
    const loadedBooks = useSelector(loadedBooksSelector) ?? [];

    const localBook = useMemo(() => loadedBooks.find((book) => book.id === id), [loadedBooks, id]);
    const book = selectedBook?.id === id ? selectedBook : localBook;

    useEffect(() => {
        if (id) {
            dispatch(fetchBookById(id));
        }
    }, [dispatch, id]);

    if (!id) {
        return (
            <Container sx={{py: 4}}>
                <Alert severity="error">Book id is missing.</Alert>
            </Container>
        );
    }

    if (selectedBookLoading && !book) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", py: 10}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (selectedBookError && !book) {
        return (
            <Container sx={{py: 4}}>
                <Alert severity="error">{selectedBookError}</Alert>
                <Button component={RouterLink} to="/books" sx={{mt: 2}}>
                    Back to books
                </Button>
            </Container>
        );
    }

    if (!book) {
        return (
            <Container sx={{py: 4}}>
                <Alert severity="info">Book details are not available.</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{py: 4}}>
            <Paper sx={{p: {xs: 2, md: 4}, borderRadius: designTokens.radius.hero}}>
                <Stack direction={{xs: "column", md: "row"}} spacing={3}>
                    <Box
                        component="img"
                        src={book.volumeInfo.imageLinks?.thumbnail ?? book.volumeInfo.imageLinks?.smallThumbnail}
                        alt={book.volumeInfo.title}
                        sx={{
                            width: {xs: "100%", md: 320},
                            maxWidth: 320,
                            maxHeight: 460,
                            objectFit: "contain",
                            borderRadius: designTokens.radius.media,
                            backgroundColor: designTokens.color.detailMediaBackground,
                            p: 1,
                        }}
                    />

                    <Box sx={{flex: 1}}>
                        <Typography variant="h4" sx={{fontWeight: 700, mb: 1}}>
                            {book.volumeInfo.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{mb: 2}}>
                            {book.volumeInfo.authors?.join(", ") ?? "Unknown author"}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{mb: 2, flexWrap: "wrap"}}>
                            {(book.volumeInfo.categories ?? ["General"]).map((category) => (
                                <Chip key={category} label={category} size="small" />
                            ))}
                        </Stack>
                        <Box
                            sx={{mb: 3, color: "text.secondary"}}
                            dangerouslySetInnerHTML={{
                                __html: book.volumeInfo.description ?? "<p>Description is not available.</p>",
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => dispatch(addToCart(book))}
                            startIcon={<AddShoppingCartTwoToneIcon/>}
                        >
                            Добавить в корзину
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};
