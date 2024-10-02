import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ForgotPasswordPage from "../pages/forgotPassword/ForgotPasswordPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import LandingPage from "../pages/web/LandingPage";
import Dashboard from "../pages/dashboard/Dashboard";
import LayoutPrivate from "../layouts/LayoutPrivate";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPublic />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/forgotPassword',
                element: <ForgotPasswordPage />
            },
            {
                path: "/dashboard",
                element: <LayoutPrivate />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    }
                ]
            }
        ]
    }
])