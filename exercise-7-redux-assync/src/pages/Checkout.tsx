import {type SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, totalPriceSelector} from "../redux/bookCart/bookCartSelectors.ts";
import type {AppDispatch} from "../redux/store.ts";
import {clearCart} from "../redux/bookCart/bookCartSlice.ts";
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {mainColor} from "../assets/style/variables.ts";

export type CheckoutInputs = {
    nameRequired: string,
    emailRequired: string,
    addressRequired: string,
    payment: string
}

export const Checkout = () => {
    const booksInCart = useSelector(booksListSelector);
    const totalPrice = useSelector(totalPriceSelector);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutInputs>();
    const onSubmit: SubmitHandler<CheckoutInputs> = (data) => {
        console.log(data);
        dispatch(clearCart());
        alert("Thank you for your order! Proceeding back to the main page.");
        navigate("/");
    }

    return (
        <Container sx={{py: '2rem'}}>
            <div>
                <Button component={Link} to={"/books"} color={"success"}>Back to Books</Button>
            </div>
            <Box sx={{display: "flex", flexDirection: {xs: 'column', md: 'row'},
                gap: '1rem', alignItems: "center", justifyContent: "center"}}>
                <Paper component={"form"} onSubmit={handleSubmit(onSubmit)} elevation={2} sx={{
                    display: "flex", alignItems: "center", flexDirection: "column", gap: '10px', p: '1rem'}}>

                    <TextField type={"text"} {...register("nameRequired", {required: true, maxLength: 20})}
                               required id="name" label="Full Name" error={errors.nameRequired && true}
                               helperText={errors.nameRequired && "Name should be filled in."}
                    />
                    <TextField type={"email"} {...register("emailRequired", {required: true, maxLength: 20})}
                               required id="email" label="Email" error={errors.emailRequired && true}
                               helperText={errors.emailRequired && "Email should be filled in."}
                    />

                    <TextField type={"text"} {...register("addressRequired", {required: true, maxLength: 30})}
                               required id="address" label="Adress" error={errors.addressRequired && true}
                               helperText={errors.addressRequired && "Address should be filled in."}
                    />
                    <FormLabel id="payment">Payment:</FormLabel>
                    <RadioGroup {...register("payment")}
                        defaultValue=""
                        aria-labelledby="payment"
                        name="payment"
                    >
                        <FormControlLabel value="card" control={<Radio/>} label="By Card" />
                        <FormControlLabel value="googlePay" control={<Radio/>} label="GooglePay" />
                        <FormControlLabel value="cashOnReceive" control={<Radio/>} label="By Cash on receive" />
                    </RadioGroup>
                    {errors.payment && (<span className="error">Payment should be filled in</span>)}
                    <Button type={"submit"} disabled={booksInCart.length === 0} variant={"contained"} color={"success"}
                            sx={{backgroundColor: mainColor, transition: '0.5s ease', '&:hover': {opacity: "70%"}}}>
                        Place your order
                    </Button>

                </Paper>

                <Paper sx={{p: '1rem'}}>
                    <Typography variant={'h5'}>Products in Cart:</Typography>
                    <Container>
                        {booksInCart.map((book) => (
                            <>
                                <Box key={book.id} sx={{display: "flex", gap: '5px'}}>
                                    <Box component={'img'}
                                         src={book.volumeInfo.imageLinks?.smallThumbnail} alt={book.volumeInfo.title}
                                         sx={{maxWidth: '80px'}}
                                    />
                                    <Box>
                                        <Typography>Name: {book.volumeInfo.title}</Typography>
                                        <Typography>Quantity: {book.quantity}</Typography>
                                        <Typography>Price: {book.saleInfo.listPrice?.amount}$</Typography>
                                    </Box>
                                </Box>
                                <hr/>
                            </>
                        ))}
                        <Typography>Total Price: {totalPrice.toFixed(2)}$</Typography>
                    </Container>
                </Paper>
            </Box>
        </Container>
    )
}