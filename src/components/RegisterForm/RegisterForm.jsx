import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [slowRequest, setSlowRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Bokubooks - Créer un compte";
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setSlowRequest(false);

    const timer = setTimeout(() => {
      setSlowRequest(true);
    }, 5000);

    try {
      await api.post("/register", {
        username,
        password,
        confirmPassword,
      });
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      const { error: code } = error.response.data;

      switch (code) {
        case "MISSING_FIELDS":
          toast.error("Veuillez remplir les deux champs.");
          break;
        case "PASSWORDS_DONT_MATCH":
          setPassword("");
          setConfirmPassword("");
          toast.error("Les mots de passe ne correspondent pas.");
          break;
        case "USERNAME_LENGTH":
          toast.error(
            "Votre nom d'utilisateur doit être entre 3 et 20 caractères.",
          );
          break;
        case "PASSWORD_TOO_SHORT":
          toast.error("Le mot de passe doit contenir au moins 8 caractères.");
          break;
        case "USER_ALREADY_EXISTS":
          toast.error("Ce nom d'utilisateur est déjà pris.");
          break;
        default:
          toast.error("Une erreur est survenue.");
      }
    } finally {
      clearTimeout(timer);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Link to="/" title="Accueil">
        <img
          src="/icons/icon.png"
          className={styles.logo}
          alt="Logo du site représenté par un livre"
        />
      </Link>
      <div className={styles.registerContainer}>
        {slowRequest && (
          <div className={styles.slowMessageContainer}>
            <p className={styles.slowMessage}>
              Création du compte, veuillez patienter.
            </p>
            <div className={styles.loader}></div>
          </div>
        )}
        <h1>Créer un compte:</h1>
        <form onSubmit={handleRegisterSubmit} className={styles.formContainer}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            minLength={3}
            maxLength={20}
          />
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
            required
          />
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            autoComplete="off"
            required
          />
          <button type="submit" className={styles.registerBtn}>
            Créer un compte
          </button>
        </form>
        <Link to="/login">Se connecter</Link>
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

export default RegisterForm;
