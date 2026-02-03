import { useState } from "react";

function UpdateModal({ book, onConfirm, onClose }) {
  const [title, setTitle] = useState(book.title);
  const [totalRead, setTotalRead] = useState(book.totalRead);
  const [totalVolumes, setTotalVolumes] = useState(book.totalVolumes);

  function handleSubmit() {
    onConfirm(book.id, title, totalRead, totalVolumes);
    onClose();
  }
  return (
    <div>
      <p>Modifier {book.title}</p>
      <button onClick={onClose}>Fermer</button>
      <p>Titre:</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>Volumes possédés:</p>
      <input
        value={totalVolumes}
        type="number"
        onChange={(e) => setTotalVolumes(Number(e.target.value))}
        min={0}
      />
      <p>Volumes lus:</p>
      <input
        value={totalRead}
        type="number"
        onChange={(e) => setTotalRead(Number(e.target.value))}
        min={0}
      />
      <button onClick={handleSubmit}>Sauvegarder</button>
    </div>
  );
}

export default UpdateModal;
