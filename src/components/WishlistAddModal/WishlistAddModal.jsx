import { useState } from "react";

function WishlistAddModal({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    onAdd(title);
    setTitle("");
  }

  return (
    <div>
      <div>
        <p>Titre:</p>
        <input
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Titre du livre..."
        />
      </div>
      <button onClick={onCancel} type="button">
        Fermer
      </button>
      <button onClick={handleSubmit} type="button">
        Ajouter
      </button>
    </div>
  );
}

export default WishlistAddModal;
