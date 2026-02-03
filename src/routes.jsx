import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import App from "./App";
import Wishlist from "./components/Wishlist/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddCollection from "./components/AddCollection/AddCollection";
import Collection from "./components/Collection/Collection";

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
];

export default routes;
