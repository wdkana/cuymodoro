import { createBrowserRouter } from "react-router-dom";
import { loginAction, registerAction } from "../actions/users.action";
import { addFeatureAction } from "../actions/features.action";
import ErrorPage from "../pages/error";
import HomePage from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

export const router = createBrowserRouter([
  {
    path: "/apps",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    action: addFeatureAction,
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
]);
