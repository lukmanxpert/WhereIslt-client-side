import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LostAndFound from "../pages/LostAndFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/lost-and-found-items",
                element: <LostAndFound />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
])
export default router;