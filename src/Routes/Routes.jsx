import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage/error-page";
import Root from "../Layout/Root";
import Home from "../Component/Home/Home";
import Login from "../Component/AuthPages/Login/Login";
import SignUp from "../Component/AuthPages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
