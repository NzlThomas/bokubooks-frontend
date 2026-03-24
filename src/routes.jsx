import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NavLayout from "./components/Outlet/Outlet";

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

const routes = [
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <NavLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        index: true,
        element: <Collection />,
      },
      {
        path: "/add-collection",
        element: <AddCollection />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

export default routes;
