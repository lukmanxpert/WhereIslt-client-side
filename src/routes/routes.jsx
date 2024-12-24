import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LostAndFound from "../pages/LostAndFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import PrivateRoutes from "./PrivateRoutes";
import AddLostAndFoundItems from "../pages/AddLostAndFoundItems";
import AllRecoveredItems from "../pages/allRecoveredItems";
import ManageMyItems from "../pages/ManageMyItems";

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
            },
            {
                path: "/add-lost-and-found-items",
                element: <PrivateRoutes><AddLostAndFoundItems></AddLostAndFoundItems></PrivateRoutes>
            },
            {
                path: "all-recovered-items",
                element: <PrivateRoutes><AllRecoveredItems></AllRecoveredItems></PrivateRoutes>
            },
            {
                path: "/manage-my-items",
                element: <PrivateRoutes><ManageMyItems></ManageMyItems></PrivateRoutes>
            }
        ]
    }
])
export default router;