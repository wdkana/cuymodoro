import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";

export default function App() {
  return <RouterProvider router={router} />;
}
