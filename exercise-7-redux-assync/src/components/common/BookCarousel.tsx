import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Box, Button, Card, CardContent, CardMedia, CircularProgress, MobileStepper, Slide, Typography} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import type {AppDispatch} from "../../redux/store.ts";
import {booksSelector, loadedBooksSelector} from "../../redux/books/booksSelectors.ts";
import {fetchBooks} from "../../redux/books/booksSlice.ts";

export const BookCarousel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector(loadedBooksSelector) ?? [];
    const {loading, error} = useSelector(booksSelector);

    const [activeStep, setActiveStep] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("left");

    useEffect(() => {
        if (!books || books.length === 0) {
            dispatch(fetchBooks({quantity: 20}));
        }
    }, [dispatch, books]);

    const featuredBooks = useMemo(() => {
        const forSale = books.filter(b => b.saleInfo.saleability === "FOR_SALE");
        const source = forSale.length > 0 ? forSale : books;

        return [...source]
            .sort((a, b) => (b.volumeInfo.averageRating ?? 0) - (a.volumeInfo.averageRating ?? 0))
            .slice(0, 10);
    }, [books]);

    const maxSteps = featuredBooks.length;

    const safeActiveStep = activeStep >= maxSteps ? 0 : activeStep;
    const currentBook = featuredBooks[safeActiveStep];

    const handleNext = () => {
        setDirection("left");
        setActiveStep((prev) => (prev + 1) % maxSteps);
    };

    const handleBack = () => {
        setDirection("right");
        setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
    };

    useEffect(() => {
        if (maxSteps <= 1) return;
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [maxSteps]);

    if (loading && books.length === 0) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{maxWidth: 420, mx: "auto", mt: 4}}>
            <Typography variant="h5" sx={{mb: 2, textAlign: "center"}}>
                Featured Books
            </Typography>

            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    Error loading featured books: {error}
                </Alert>
            )}

            {!loading && featuredBooks.length === 0 && (
                <Typography variant="body1" color="text.secondary" sx={{textAlign: "center"}}>
                    No featured books available right now.
                </Typography>
            )}

            {featuredBooks.length > 0 && currentBook && (
                <>
                    <Slide in mountOnEnter unmountOnExit direction={direction} key={activeStep}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minHeight: 320,
                            }}
                        >
                            <CardMedia
                                sx={{
                                    height: 220,
                                    width: "100%",
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    pt: 2,
                                    backgroundColor: "inherit",
                                }}
                                image={
                                    currentBook.volumeInfo.imageLinks?.thumbnail ??
                                    currentBook.volumeInfo.imageLinks?.smallThumbnail ??
                                    ""
                                }
                                title={currentBook.volumeInfo.title}
                            />
                            <CardContent sx={{textAlign: "center"}}>
                                <Typography variant="h6" gutterBottom noWrap>
                                    {currentBook.volumeInfo.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {currentBook.volumeInfo.authors
                                        ? currentBook.volumeInfo.authors.join(", ")
                                        : "Unknown author"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>

                    {maxSteps > 1 && (
                        <MobileStepper
                            variant="dots"
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            sx={{
                                mt: 2,
                                justifyContent: "space-between",
                                "& .MuiMobileStepper-dots": {
                                    flexGrow: 1,
                                    justifyContent: "center",
                                },
                            }}
                            nextButton={
                                <Button size="small" onClick={handleNext}>
                                    Next
                                    <KeyboardArrowRight/>
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack}>
                                    <KeyboardArrowLeft/>
                                    Back
                                </Button>
                            }
                        />
                    )}
                </>
            )}
        </Box>
    );
}

