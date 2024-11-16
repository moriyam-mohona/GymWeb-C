import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Component/ErrorPage/error-page";
import Root from "../Layout/Root";
import Home from "../Component/Home/Home";
import Login from "../Component/AuthPages/Login/Login";
import SignUp from "../Component/AuthPages/SignUp/SignUp";
import DashboardLayout from "../Component/Dashboard/DashboardLayout/DashboardLayout";
import AdminHome from "../Component/Dashboard/Admin/AdminHome/AdminHome";
import ManageTrainers from "../Component/Dashboard/Admin/Manage-Trainers/ManageTrainers";
import TrainerRequests from "../Component/Dashboard/Admin/Trainer-Requestes/TrainerRequests";
import ManageClass from "../Component/Dashboard/Admin/ManageClass/ManageClass";
import TrainerProfile from "../Component/Dashboard/Trainer/TrainerProfile/TrainerProfile";
import TraineeProfile from "../Component/Dashboard/Trainee/TraineeProfile/TraineeProfile";
import AdminProfile from "../Component/Dashboard/Admin/AdminProfile/AdminProfile";
import BookSchedule from "../Component/Dashboard/Trainee/BookSchedule/BookSchedule";
import AssignedSchedule from "../Component/Dashboard/Trainer/Assiged-Schedules/AssignedSchedules";

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
      { path: "Admin-Profile", element: <AdminProfile /> },
      { path: "Trainee-Profile", element: <TraineeProfile /> },
      { path: "Trainer-Profile", element: <TrainerProfile /> },
      { path: "Trainer-Request", element: <TrainerRequests /> },
      { path: "Manage-Class", element: <ManageClass /> },
      { path: "Book-Schedule", element: <BookSchedule /> },
      { path: "Assigned-Schedule", element: <AssignedSchedule /> },
    ],
  },
]);

export default router;
