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
        handle: {title: 'Home'}
    },
    {
        title: 'Books',
        path: "/books",
        Component: Books,
        handle: {title: 'Books'}
    },
]

export const profileRoutes = [
    {
        title: 'Cart',
        path: '/cart',
        Component: Cart,
        handle: {title: 'Cart'}
    },
    {
        title: 'Checkout',
        path: "/checkout",
        Component: Checkout,
        handle: {title: 'Checkout'}
    }
]