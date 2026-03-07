import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {UserProvider} from "./components/UserContext.tsx";
import {routes} from "./components/routes.ts";
import {NotFound} from "./pages/NotFound.tsx";
import {ErrorBoundary} from "./pages/ErrorBoundary.tsx";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <ErrorBoundary/>,
            Component: Home,
        },
        {
            children: [
                ...routes,
                {
                    path: "*",
                    Component: NotFound
                }
            ]
        }
    ])
  return (
      <UserProvider>
          <RouterProvider router={router}/>
      </UserProvider>
  )
}

export default App
