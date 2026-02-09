import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api/api";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  async function handleChangeUsername(e) {
    e.preventDefault();

    try {
      if (newUsername.trim() === "") {
        setUsernameMessage(
          "Veuillez renseigner votre nouveau nom d'utilisateur.",
        );
        return;
      }

      if (newUsername.length < 3 || newUsername.length > 20) {
        setUsernameMessage(
          "Votre nom ne peut pas être inférieur à 3 ou supérieur à 20 caractères.",
        );
        setNewUsername("");
        return;
      }

      if (user.username === newUsername) {
        setUsernameMessage(
          "Le nom d'utilisateur doit être différent du précédent.",
        );
        return;
      }

      await api.put("/username", {
        newUsername,
      });

      setUsernameMessage("Votre nom d'utilisateur a bien été mis à jour.");

      setUser((prev) => ({ ...prev, username: newUsername }));
      setNewUsername("");
    } catch (error) {
      if (error.response?.status === 409) {
        setUsernameMessage("Ce nom d'utilisateur est déjà utilisé.");
      } else {
        console.error(error);
      }
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    try {
      if (currentPassword.trim() === "" || newPassword.trim() === "") {
        setPasswordMessage("Veuillez remplir les deux champs.");
        return;
      }

      if (!currentPassword || !newPassword) {
        setPasswordMessage("Veuillez remplir les deux champs.");
        return;
      }

      if (newPassword.length < 8) {
        setPasswordMessage(
          "Le mot de passe doit contenir au moins 8 caractères.",
        );
        return;
      }

      await api.put("/password", {
        currentPassword,
        newPassword,
      });
      setPasswordMessage("Votre mot de passe a bien été mis à jour.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      const { error: code } = error.response.data;

      switch (code) {
        case "MISSING_FIELDS":
          setPasswordMessage("Veuillez remplir tous les champs.");
          break;
        case "PASSWORD_TOO_SHORT":
          setPasswordMessage(
            "Le mot de passe doit contenir au moins 8 caractères.",
          );
          break;
        case "INVALID_CURRENT_PASSWORD":
          setPasswordMessage("Mot de passe actuel incorrect.");
          break;
        case "SAME_PASSWORDS":
          setPasswordMessage("Le nouveau mot de passe doit être différent.");
          break;
        case "USER_NOT_FOUND":
          setPasswordMessage("Utilisateur introuvable.");
          break;
        default:
          setPasswordMessage("Une erreur est survenue.");
      }
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleChangeUsername}>
          <label>Changer votre nom d'utilisateur</label>
          <input
            placeholder={user.username}
            onChange={(e) => setNewUsername(e.target.value)}
            value={newUsername}
            min={3}
            max={20}
          />
          <button type="submit">Changer</button>
        </form>
        {usernameMessage && <p>{usernameMessage}</p>}
      </div>

      <div>
        <p>Changer de mot de passe</p>
        <form onSubmit={handleChangePassword}>
          <label>Nouveau mot de passe:</label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            required
            value={newPassword}
          />
          <label>Mot de passe actuel:</label>
          <input
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            required
            value={currentPassword}
          />
          <button type="submit">Changer</button>
        </form>
        {passwordMessage && <p>{passwordMessage}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
