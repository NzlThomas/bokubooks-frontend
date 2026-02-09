import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import App from "./App";
import Wishlist from "./components/Wishlist/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddCollection from "./components/AddCollection/AddCollection";
import Collection from "./components/Collection/Collection";
import Dashboard from "./components/Dashboard/Dashboard";

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
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    ),
  },
  {
    path: "/collection",
    element: (
      <ProtectedRoute>
        <Collection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-collection",
    element: (
      <ProtectedRoute>
        <AddCollection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

export default routes;
