import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {User} from "./pages/User.tsx";
import {ToDoList} from "./pages/ToDoList.tsx";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Home,
        },
        {
            path: "/user",
            Component: User
        },
        {
            path: "/todolist",
            Component: ToDoList
        }
    ])
  return (
      <RouterProvider router={router}>
      </RouterProvider>
  )
}

export default App
