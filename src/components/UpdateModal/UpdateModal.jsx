import { useRef, useEffect, useState, useCallback } from "react";
import FocusTrap from "focus-trap-react";
import styles from "./UpdateModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

function UpdateModal({ book, onConfirm, onClose }) {
  const [title, setTitle] = useState(book.title);
  const [totalRead, setTotalRead] = useState(book.totalRead);
  const [totalVolumes, setTotalVolumes] = useState(book.totalVolumes);
  const [notes, setNotes] = useState(book.notes);

  const modalRef = useRef(null);

  const handleSubmit = useCallback(() => {
    onConfirm(book.id, title, totalRead, totalVolumes, notes);
    onClose();
  }, [book.id, title, totalRead, totalVolumes, notes, onConfirm, onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, handleSubmit]);

  return (
    <div className={styles.overlay}>
      <FocusTrap>
        <form className={styles.updateContainer} ref={modalRef}>
          <div className={styles.titleContainer}>
            <h2>Modifier {book.title}</h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              title="Fermer"
            >
              <IoCloseOutline size={40} />
            </button>
          </div>

          <div className={styles.editTitleContainer}>
            <label className={styles.title} htmlFor="title">
              Titre:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
            />
          </div>

          <div className={styles.ownedContainer}>
            <label className={styles.ownedTitle} htmlFor="totalVolumes">
              Vols. possédés:
            </label>
            <div className={styles.ownedNumberInput}>
              <button
                onClick={() => setTotalVolumes((v) => Math.max(0, v - 1))}
                type="button"
              >
                -
              </button>
              <input
                name="totalVolumes"
                id="totalVolumes"
                type="number"
                required
                onChange={(e) => setTotalVolumes(Number(e.target.value))}
                value={totalVolumes}
                min={0}
              />
              <button
                onClick={() => setTotalVolumes((v) => v + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.readContainer}>
            <label className={styles.readTitle} htmlFor="totalRead">
              Vols. lus:
            </label>
            <div className={styles.ownedNumberInput}>
              <button
                onClick={() => setTotalRead((v) => Math.max(0, v - 1))}
                type="button"
              >
                -
              </button>
              <input
                name="totalRead"
                id="totalRead"
                type="number"
                required
                onChange={(e) => setTotalRead(Number(e.target.value))}
                value={totalRead}
                min={0}
              />
              <button onClick={() => setTotalRead((v) => v + 1)} type="button">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => setTotalRead(totalVolumes)}
              className={styles.maxBtn}
            >
              Max
            </button>
          </div>
          <label htmlFor="note" className={styles.srOnly}>
            Ajouter une note à {book.title}
          </label>
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes ? notes : ""}
            placeholder={`Ajouter une note à ${book.title}`}
            className={styles.notesArea}
            name="note"
            id="note"
          />
          <button
            onClick={handleSubmit}
            type="button"
            className={styles.saveButton}
          >
            Sauvegarder
          </button>
        </form>
      </FocusTrap>
    </div>
  );
}

export default UpdateModal;
