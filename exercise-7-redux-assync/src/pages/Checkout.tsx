import {type SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, totalPriceSelector} from "../redux/bookCart/bookCartSelectors.ts";
import type {AppDispatch} from "../redux/store.ts";
import {clearCart} from "../redux/bookCart/bookCartSlice.ts";
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GoogleIcon from '@mui/icons-material/Google';
import PaymentsIcon from '@mui/icons-material/Payments';
import {mainColor} from "../assets/style/variables.ts";
import {addNotification} from "../redux/notification/notificationSlice.ts";
import {checkoutSchema, type CheckoutInputs} from "../schemas/checkoutSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export const Checkout = () => {
    const booksInCart = useSelector(booksListSelector);
    const totalPrice = useSelector(totalPriceSelector);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<CheckoutInputs>({
        resolver: zodResolver(checkoutSchema),
    });
    const onSubmit: SubmitHandler<CheckoutInputs> = (data) => {
        console.log(data);
        dispatch(clearCart());
        dispatch(
            addNotification({
                message: "Thank you! Your order has been placed successfully.",
                severity: "success",
                autoHideDuration: 3500,
            })
        );
        navigate("/");
    }

    return (
        <Container sx={{py: {xs: "1.5rem", md: "2.5rem"}}}>
            <Button
                component={Link}
                to={"/cart"}
                variant="text"
                sx={{
                    color: mainColor,
                    fontWeight: 600,
                    mb: 2,
                    "&:hover": {backgroundColor: "rgba(40, 104, 67, 0.08)"},
                }}
            >
                Back to Cart
            </Button>

            <Paper
                elevation={0}
                sx={{
                    p: {xs: 2, md: 3},
                    borderRadius: 3,
                    border: "1px solid rgba(40, 104, 67, 0.16)",
                    background: "linear-gradient(135deg, rgba(40, 104, 67, 0.06) 0%, rgba(255,255,255,1) 55%)",
                }}
            >
                <Typography variant="h4" sx={{fontWeight: 700, color: mainColor, mb: 0.5}}>
                    Checkout
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{mb: 3}}>
                    Complete your order details and choose payment method.
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {xs: "1fr", md: "1.1fr 0.9fr"},
                        gap: 2,
                        alignItems: "start",
                    }}
                >
                    <Paper
                        component={"form"}
                        onSubmit={handleSubmit(onSubmit)}
                        elevation={0}
                        sx={{
                            p: {xs: 2, md: 3},
                            borderRadius: 3,
                            border: "1px solid rgba(40, 104, 67, 0.18)",
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{fontWeight: 600}}>
                            Delivery information
                        </Typography>

                        <TextField type={"text"} {...register("nameRequired")}
                                   id="name" label="Full Name" error={!!errors.nameRequired}
                                   helperText={errors.nameRequired?.message}
                                   fullWidth
                        />
                        <TextField type={"email"} {...register("emailRequired")}
                                   id="email" label="Email" error={!!errors.emailRequired}
                                   helperText={errors.emailRequired?.message}
                                   fullWidth
                        />

                        <TextField type={"text"} {...register("addressRequired")}
                                   id="address" label="Adress" error={!!errors.addressRequired}
                                   helperText={errors.addressRequired?.message}
                                   fullWidth
                        />

                        <Divider/>

                        <FormLabel id="payment" sx={{color: mainColor, fontWeight: 600}}>Payment method</FormLabel>
                        <RadioGroup
                            defaultValue=""
                            aria-labelledby="payment"
                            name="payment"
                        >
                            <FormControlLabel 
                                value="card" 
                                control={<Radio/>} 
                                {...register("payment")} 
                                label={<>By Card <CreditCardIcon /></>} 
                            />

                            <FormControlLabel 
                                value="googlePay" 
                                control={<Radio/>} 
                                {...register("payment")} 
                                label={<>GooglePay <GoogleIcon /></>} 
                            />
                            
                            <FormControlLabel 
                                value="cashOnReceive" 
                                control={<Radio/>} 
                                {...register("payment")} 
                                label={<>By Cash on receive <PaymentsIcon /></>} 
                            />
                        </RadioGroup>
                        {errors.payment && (<Typography variant="body2" color="error">{errors.payment.message}</Typography>)}

                        <Button
                            type={"submit"}
                            disabled={booksInCart.length === 0}
                            variant={"contained"}
                            sx={{
                                mt: 1,
                                py: 1.2,
                                fontWeight: 700,
                                backgroundColor: mainColor,
                                transition: "0.3s ease",
                                "&:hover": {opacity: "85%", backgroundColor: mainColor},
                                "&:disabled": {opacity: 0.5, color: "white"},
                            }}
                        >
                            Place your order
                        </Button>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: {xs: 2, md: 3},
                            borderRadius: 3,
                            border: "1px solid rgba(40, 104, 67, 0.18)",
                            backgroundColor: "white",
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                            <Typography variant={"h6"} sx={{fontWeight: 600}}>Products in Cart</Typography>
                            <Chip label={`${booksInCart.length} items`} sx={{backgroundColor: "rgba(40, 104, 67, 0.1)", color: mainColor}} />
                        </Stack>

                        <Box sx={{display: "flex", flexDirection: "column", gap: 1.5}}>
                            {booksInCart.length === 0 && (
                                <Typography color="text.secondary">Your cart is empty.</Typography>
                            )}
                            {booksInCart.map((book) => (
                                <Box key={book.id}>
                                    <Box sx={{display: "flex", gap: 1.5}}>
                                        <Box component={'img'}
                                             src={book.volumeInfo.imageLinks?.smallThumbnail} alt={book.volumeInfo.title}
                                             sx={{width: 64, height: 96, objectFit: "contain", borderRadius: 1, backgroundColor: "#f7f7f7", p: 0.5}}
                                        />
                                        <Box>
                                            <Typography sx={{fontWeight: 600}}>{book.volumeInfo.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">Quantity: {book.quantity}</Typography>
                                            <Typography variant="body2" color="text.secondary">Price: {book.saleInfo.listPrice?.amount}$</Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{mt: 1.5}}/>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{display: "flex", justifyContent: "space-between", mt: 2}}>
                            <Typography sx={{fontWeight: 600}}>Total</Typography>
                            <Typography sx={{fontWeight: 700, color: mainColor}}>{totalPrice.toFixed(2)}$</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Paper>
        </Container>
    )
}