import { createBrowserRouter } from "react-router-dom";
import { addFeatureAction } from "./actions";
import ErrorPage from "../pages/error";
import HomePage from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    action: addFeatureAction,
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
]);
