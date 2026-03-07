import {Books} from "../../pages/Books.tsx";
import {Checkout} from "../../pages/Checkout.tsx";
import {Home} from "../../pages/Home.tsx";
import {Cart} from "../../pages/Cart.tsx";

export const mainRoutes = [
    {
        title: 'Home',
        path: '',
        Component: Home,
        label: 'Home',
    },
    {
        title: 'Books',
        path: "/books",
        Component: Books
    }
]

export const profileRoutes = [
    {
        title: 'Profile',
        path: '/profile',
    },
    {
        title: 'Cart',
        path: '/cart',
        Component: Cart
    },
    {
        title: 'Checkout',
        path: "/checkout",
        Component: Checkout
    }
]