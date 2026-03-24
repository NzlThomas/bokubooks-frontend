import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import styles from "./LoginForm.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const { login, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  function displayPassword() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      login(res.data.user);
      navigate("/app");
    } catch (error) {
      const { error: code } = error.response.data;

      switch (code) {
        case "AUTHENTICATION_FAILED":
          toast.error("Nom d'utilisateur ou mot de passe incorrect.");
          break;
        default:
          toast.error("Une erreur est survenue.");
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <h1>Se connecter</h1>
        <form onSubmit={handleLoginSubmit} className={styles.formContainer}>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            autoComplete="off"
            className={styles.usernameInput}
          />
          <label htmlFor="password">Mot de passe:</label>
          <span className={styles.inputIconContainer}>
            <input
              type={passwordType}
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              autoComplete="off"
              className={styles.passwordInput}
            />
            {passwordType === "password" ? (
              <FaEye onClick={() => displayPassword()} size={20} />
            ) : (
              <FaEyeSlash onClick={() => displayPassword()} size={20} />
            )}
          </span>

          <button type="submit" className={styles.loginBtn}>
            Se connecter
          </button>
        </form>
        <Link to="/register">Créer un compte</Link>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default LoginForm;
