import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {mainRoutes, profileRoutes} from "./components/layout/routes.ts";
import {NotFound} from "./pages/NotFound.tsx";
import {ErrorBoundary} from "./pages/ErrorBoundary.tsx";
import {Layout} from "./pages/Layout.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <ErrorBoundary/>,
            element: <Layout/>,
            children: [
                ...mainRoutes, ...profileRoutes,
                {
                    path: "*",
                    Component: NotFound
                }
            ]
        }
    ])
  return (
          <RouterProvider router={router}/>
  )
}

export default App
