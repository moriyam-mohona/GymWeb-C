import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage/error-page";
import Root from "../Layout/Root";
import Home from "../Component/Home/Home";
import Login from "../Component/AuthPages/Login/Login";
import SignUp from "../Component/AuthPages/SignUp/SignUp";
import DashboardLayout from "../Component/Dashboard/DashboardLayout/DashboardLayout";
import AdminHome from "../Component/Dashboard/Admin/AdminHome/AdminHome";
import ManageTrainers from "../Component/Dashboard/Admin/Manage-Trainers/ManageTrainers";

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
  {
    path: "/Dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <AdminHome /> },
      { path: "Manage-Trainers", element: <ManageTrainers /> },
    ],
  },
]);

export default router;
