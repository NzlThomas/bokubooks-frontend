import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api/api";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

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
      console.error(error);

      if (error.response?.status === 409) {
        setUsernameMessage("Ce nom d'utilisateur est déjà utilisé.");
      } else {
        console.error(error);
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
    </div>
  );
}

export default Dashboard;
