import {clearCart, decreaseQuantity, increaseQuantity, removeFromCart} from "../redux/bookCart/bookCartSlice.ts";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, totalPriceSelector, totalQuantitySelector} from "../redux/bookCart/bookCartSelectors.ts";
import type {AppDispatch} from "../redux/store.ts";
import {Box, Button, Chip, Container, Grid, Paper, Stack, Typography} from "@mui/material";
import {BookCardCart} from "../components/common/BookCardCart.tsx";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

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
        <>
            <Container sx={{py: "1rem", display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <h3>List of the Books in Cart</h3>
                <Grid container spacing={1}>
                    {booksCartList.length === 0 && (
                        <Typography>
                            The Cart is Empty.
                        </Typography>
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
                <Paper elevation={2} sx={{ p: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Button
                            component={Link}
                            to={'/checkout'}
                        >
                            Place the order
                        </Button>
                        <Button onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart <DeleteForeverOutlinedIcon/>
                        </Button>
                    </Box>
                    <Stack direction={{xs: "column", md: "row"}} spacing={1}>
                        <Chip label={"Total Quantity: " + totalQuantity} color="success" />
                        <Chip label={totalPrice.toFixed(2) + "$"} color="success" />
                    </Stack>
                </Paper>
            </Container>
        </>
    )
 }