import {User} from "../pages/User.tsx";
import {ToDoList} from "../pages/ToDoList.tsx";
import {Books} from "../pages/Books.tsx";
import {Checkout} from "../pages/Checkout.tsx";

export const routes = [
    {
        path: "/user",
        Component: User
    },
    {
        path: "/todolist",
        Component: ToDoList
    },
    {
        path: "/books",
        Component: Books
    },
    {
        path: "/checkout",
        Component: Checkout
    }
]