import { useState } from "react";
import api from "../../api/api";

function AddCollection() {
  const [title, setTitle] = useState("");
  const [totalVolumes, setTotalVolumes] = useState(0);
  const [totalRead, setTotalRead] = useState(0);
  const [error, setError] = useState("");
  const [addedMessage, setAddedMessage] = useState("");

  async function handleAddBook(e) {
    e.preventDefault();

    try {
      if (title.trim().length === 0) {
        setError("Erreur: Titre obligatoire");
        return;
      }

      if (totalVolumes < 1) {
        setError("Erreur: Vous devez posséder au minimum 1 volume.");
        return;
      }

      if (totalRead > totalVolumes) {
        setError(
          "Erreur: Les volumes lus ne peuvent pas dépasser les volumes possédés.",
        );
        return;
      }

      await api.post("/collection", {
        title,
        totalRead,
        totalVolumes,
      });
      setAddedMessage(`${title} a bien été ajouté à votre collection!`);
      setError("");
      setTitle("");
      setTotalVolumes(0);
      setTotalRead(0);
    } catch (error) {
      if (error.response?.status === 409) {
        setError(`Erreur: ${title} est déjà dans votre collection!`);
      } else {
        console.error(error);
      }
    }
  }
  return (
    <div>
      <form onSubmit={handleAddBook}>
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="totalVolumes">Volumes possédés:</label>
        <input
          name="totalVolumes"
          type="number"
          required
          onChange={(e) => setTotalVolumes(Number(e.target.value))}
          value={totalVolumes}
          min={0}
        />
        <label htmlFor="totalRead">Volumes lus:</label>
        <input
          name="totalRead"
          type="number"
          required
          onChange={(e) => setTotalRead(Number(e.target.value))}
          value={totalRead}
          min={0}
        />
        <button type="submit">Ajouter</button>
      </form>
      {error && <p>{error}</p>}
      {addedMessage && <p>{addedMessage}</p>}
    </div>
  );
}

export default AddCollection;
