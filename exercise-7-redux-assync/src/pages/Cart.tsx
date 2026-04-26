import {clearCart, decreaseQuantity, increaseQuantity, removeFromCart} from "../redux/bookCart/bookCartSlice.ts";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, totalPriceSelector, totalQuantitySelector} from "../redux/bookCart/bookCartSelectors.ts";
import type {AppDispatch} from "../redux/store.ts";
import {Box, Button, Chip, Container, Grid, Paper, Stack, Typography} from "@mui/material";
import {BookCardCart} from "../components/common/BookCardCart.tsx";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {mainColor} from "../assets/style/variables.ts";

export const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const booksCartList = useSelector(booksListSelector);
    const totalQuantity = useSelector(totalQuantitySelector);
    const totalPrice = useSelector(totalPriceSelector);

    function handleIncrease (bookId: string) {
        dispatch(increaseQuantity(bookId))
    }
    function handleDecrease (bookId: string) {
        dispatch(decreaseQuantity(bookId))
    }
    function handleRemove (bookId: string) {
        dispatch(removeFromCart(bookId))
    }
    return (
        <Container sx={{py: {xs: "1.5rem", md: "2.5rem"}, display: "flex", flexDirection: "column", gap: 2}}>
            <Paper
                elevation={0}
                sx={{
                    p: {xs: 2, md: 3},
                    borderRadius: 3,
                    border: "1px solid rgba(40, 104, 67, 0.16)",
                    background: "linear-gradient(135deg, rgba(40, 104, 67, 0.06) 0%, rgba(255,255,255,1) 55%)",
                }}
            >
                <Stack
                    direction={{xs: "column", md: "row"}}
                    justifyContent="space-between"
                    alignItems={{xs: "flex-start", md: "center"}}
                    spacing={1.5}
                >
                    <Box>
                        <Typography variant="h4" sx={{fontWeight: 700, color: mainColor}}>
                            Your Cart
                        </Typography>
                        <Typography color="text.secondary">
                            Review selected books and proceed to checkout.
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            <Grid container spacing={2}>
                {booksCartList.length === 0 && (
                    <Grid size={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                textAlign: "center",
                                border: "1px dashed rgba(40, 104, 67, 0.3)",
                                color: "text.secondary",
                            }}
                        >
                            The Cart is Empty.
                        </Paper>
                    </Grid>
                )}
                {booksCartList.length > 0 && booksCartList.map((book) => (
                        <Grid key={book.id} size={{xs: 12, sm: 6, md: 4}}>
                            <BookCardCart bookInfo={book}
                                          increaseQuantity={handleIncrease}
                                          decreaseQuantity={handleDecrease}
                                          removeFromCart={handleRemove}
                            />
                        </Grid>
                    )
                )}
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    p: {xs: 2, md: 2.5},
                    borderRadius: 3,
                    border: "1px solid rgba(40, 104, 67, 0.16)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: {xs: "column", md: "row"},
                    gap: 1.5,
                }}
            >
                <Stack direction={{xs: "column", sm: "row"}} spacing={1.5} sx={{width: {xs: "100%", md: "auto"}}}>
                    <Button
                        component={Link}
                        to={'/checkout'}
                        variant="contained"
                        sx={{
                            backgroundColor: mainColor,
                            fontWeight: 700,
                            "&:hover": {backgroundColor: mainColor, opacity: 0.9},
                        }}
                    >
                        Place the order
                    </Button>
                    <Button
                        sx={{display: "flex", alignItems: "center", color: mainColor}}
                        onClick={() => dispatch(clearCart())}
                        variant="text"
                        endIcon={<DeleteForeverOutlinedIcon />}
                    >
                        Clear Cart
                    </Button>
                </Stack>
                <Stack direction={{xs: "column", sm: "row"}} spacing={1}>
                    <Chip label={"Total Quantity: " + totalQuantity} sx={{backgroundColor: "rgba(40, 104, 67, 0.1)", color: mainColor}} />
                    <Chip label={totalPrice.toFixed(2) + "$"} sx={{backgroundColor: "rgba(40, 104, 67, 0.1)", color: mainColor, fontWeight: 700}} />
                </Stack>
            </Paper>
        </Container>
    )
 }