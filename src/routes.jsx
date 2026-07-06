import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NavLayout from "./components/Outlet/Outlet";

const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const LoginForm = lazy(() => import("./components/LoginForm/LoginForm"));
const RegisterForm = lazy(
  () => import("./components/RegisterForm/RegisterForm"),
);
const Wishlist = lazy(() => import("./components/Wishlist/Wishlist"));
const AddCollection = lazy(
  () => import("./components/AddCollection/AddCollection"),
);
const Collection = lazy(() => import("./components/Collection/Collection"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Statistics = lazy(() => import("./components/Statistics/Statistics"));

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <NavLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Collection />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "add-collection",
        element: <AddCollection />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
