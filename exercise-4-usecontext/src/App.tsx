import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {User} from "./pages/User.tsx";
import {ToDoList} from "./pages/ToDoList.tsx";
import {UserProvider} from "./components/UserContext.tsx";
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
        },
    ])
  return (
      <UserProvider>
          <RouterProvider router={router}/>
      </UserProvider>
  )
}

export default App
