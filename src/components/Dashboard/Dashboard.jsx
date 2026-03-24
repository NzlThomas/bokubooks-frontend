import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api/api";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user, setUser, logout } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  async function handleChangeUsername(e) {
    e.preventDefault();

    try {
      if (newUsername.trim() === "") {
        toast.error("Veuillez renseigner votre nouveau nom d'utilisateur.");
        return;
      }

      if (newUsername.length < 3 || newUsername.length > 20) {
        toast.error(
          "Votre nom ne peut pas être inférieur à 3 ou supérieur à 20 caractères.",
        );
        return;
      }

      if (user.username === newUsername) {
        toast.error("Le nom d'utilisateur doit être différent du précédent.");
        return;
      }

      await api.put("/username", {
        newUsername,
      });

      toast.success("Votre nom d'utilisateur a bien été mis à jour.");

      setUser((prev) => ({ ...prev, username: newUsername }));
      setNewUsername("");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Ce nom d'utilisateur est déjà utilisé.");
      } else {
        console.error(error);
      }
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    try {
      if (currentPassword.trim() === "" || newPassword.trim() === "") {
        toast.error("Veuillez remplir les deux champs.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        return;
      }

      if (newPassword.length < 8) {
        toast.error("Votre mot de passe doit contenir au moins 8 caractères.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        return;
      }

      await api.put("/password", {
        currentPassword,
        newPassword,
      });

      toast.success("Votre mot de passe a bien été mis à jour.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      const { error: code } = error.response.data;

      switch (code) {
        case "MISSING_FIELDS":
          toast.error("Veuillez remplir les deux champs.");
          break;
        case "PASSWORD_TOO_SHORT":
          toast.error("Le mot de passe doit contenir au moins 8 caractères.");
          break;
        case "INVALID_CURRENT_PASSWORD":
          toast.error("Mot de passe actuel incorrect.");
          setCurrentPassword("");
          break;
        case "SAME_PASSWORDS":
          toast.error("Le nouveau mot de passe doit être différent.");
          setNewPassword("");
          break;
        case "USER_NOT_FOUND":
          toast.error("Utilisateur introuvable.");
          break;
        default:
          toast.error("Une erreur est survenue.");
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.usernameContainer}>
        <form onSubmit={handleChangeUsername}>
          <label htmlFor="username">Changer votre nom d'utilisateur</label>
          <div>
            <input
              placeholder={user.username}
              onChange={(e) => setNewUsername(e.target.value)}
              value={newUsername}
              min={3}
              max={20}
              name="username"
              id="username"
              autoComplete="off"
            />
            <button type="submit" className={styles.formButton}>
              Changer
            </button>
          </div>
        </form>
      </div>

      <div className={styles.passwordContainer}>
        <p>Changer de mot de passe</p>
        <form onSubmit={handleChangePassword}>
          <label htmlFor="newPassword">Nouveau mot de passe:</label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            id="newPassword"
            name="newPassword"
            required
            value={newPassword}
          />
          <label htmlFor="currentPassword">Mot de passe actuel:</label>
          <input
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            required
            value={currentPassword}
            name="currentPassword"
            id="currentPassword"
          />
          <button type="submit" className={styles.formButton}>
            Changer
          </button>
        </form>
      </div>
      <button onClick={logout} className={styles.logoutBtn}>
        Déconnexion
      </button>
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

export default Dashboard;
