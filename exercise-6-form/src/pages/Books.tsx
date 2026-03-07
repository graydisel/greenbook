import {books} from "../components/books.ts";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import {booksListSelector, totalPriceSelector, totalQuantitySelector} from "../redux/bookCart/bookSelectors.ts";
import {addToCart, decreaseQuantity, increaseQuantity, removeFromCart} from "../redux/bookCart/bookCartSlice.ts";

export const Books = () => {
    const dispatch = useDispatch<AppDispatch>();
    const booksCartList = useSelector(booksListSelector);
    const totalQuantity = useSelector(totalQuantitySelector);
    const totalPrice = useSelector(totalPriceSelector);
    return (
        <>
            <div className={'cart'}>
                <h3>List of the Books in Cart</h3>
                { booksCartList.length === 0 ?
                    (
                        <p>Cart is empty</p>
                    ) :
                    booksCartList.map((book) => (
                    <div className={'cartItem'} key={book.id}>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "10px"}}>
                            <p>Title: {book.title};</p>
                            <p>Author: {book.author};</p>
                            <p>Price: {book.price.toFixed(2)}$;</p>
                            <p>Quantity: {book.quantity}</p>
                        </div>
                        <div style={{display: "flex", gap: "5px"}}>
                            <button onClick={() => dispatch(increaseQuantity(book.id))}>+</button>
                            <button onClick={() => dispatch(decreaseQuantity(book.id))} disabled={book.quantity <= 1}>-</button>
                            <button onClick={() => dispatch(removeFromCart(book.id))}>Remove</button>
                        </div>
                    </div>
                ))}
                <div>
                    <p>Total quantity: {totalQuantity}</p>
                    <p>Total price: {totalPrice.toFixed(2)}$</p>
                </div>
                <div>
                    <Link to={"/checkout"}><button>Place the order</button></Link>
                </div>
            </div>
            <h3>List of the Books</h3>
            <div className="books-list">
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        <p>Title: {book.title}</p>
                        <p>Year: {book.rating}</p>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <p>Rating: {book.rating}</p>
                        <p>Price {book.price.toFixed(2)}$</p>
                        <div>
                            <button onClick={() => dispatch(addToCart(book))}>To the Cart</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{margin: "20px"}}>
                <Link to={'/'}><button>Back</button></Link>
            </div>
        </>
    )
}