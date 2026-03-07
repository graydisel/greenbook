import {type SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {booksListSelector, totalPriceSelector} from "../redux/bookCart/bookSelectors.ts";
import type {AppDispatch} from "../redux/store.ts";
import {clearCart} from "../redux/bookCart/bookCartSlice.ts";

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
        <>
            <div>
                <Link to={"/books"}><button>Back to Books</button></Link>
            </div>
            <div className={"checkout-container"}>
                <form className={"checkout"} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name:</label>
                    <input type={"text"} id={"name"} {...register("nameRequired", {required: true, maxLength: 20})} />
                    {errors.nameRequired && (<span className="error">Name should be filled in</span>)}
                    <label htmlFor="email">Email:</label>
                    <input type={"email"} id={"email"} {...register("emailRequired", {required: true, maxLength: 20})} />
                    {errors.emailRequired && (<span className="error">Email should be filled in</span>)}
                    <label htmlFor="address">Address:</label>
                    <input type={"text"} id={"address"} {...register("addressRequired", {required: true, maxLength: 30})} />
                    {errors.addressRequired && (<span className="error">Address should be filled in</span>)}
                    <label htmlFor="payment">Payment:</label>
                    <select id="payment" {...register("payment")} defaultValue={""}>
                        <option value={""} disabled>...</option>
                        <option value="card">By Card Now</option>
                        <option value="cashOnReceive">By Cash on Receive</option>
                    </select>
                    {errors.payment && (<span className="error">Payment should be filled in</span>)}
                    <button type={"submit"} disabled={booksInCart.length === 0}>Place your order</button>
                </form>
                <div className={"order-list-container"}>
                    <p>Products in Cart:</p>
                    <hr/>
                    <div>
                        {booksInCart.map((book) => (
                            <div key={book.id}>
                                <p>Name: {book.title}</p>
                                <p>Quantity: {book.quantity}</p>
                                <p>Price: {book.price}</p>
                                <hr/>
                            </div>
                        ))}
                        <p>Total Price: {totalPrice.toFixed(2)}$</p>
                    </div>
                </div>
            </div>
        </>
    )
}