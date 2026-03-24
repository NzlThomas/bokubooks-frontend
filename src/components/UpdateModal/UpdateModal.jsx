import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./UpdateModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

function UpdateModal({ book, onConfirm, onClose }) {
  const [title, setTitle] = useState(book.title);
  const [totalRead, setTotalRead] = useState(book.totalRead);
  const [totalVolumes, setTotalVolumes] = useState(book.totalVolumes);

  const modalRef = useRef(null);

  const handleSubmit = useCallback(() => {
    onConfirm(book.id, title, totalRead, totalVolumes);
    onClose();
  }, [book.id, title, totalRead, totalVolumes, onConfirm, onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, handleSubmit]);

  return (
    <div className={styles.overlay}>
      <div className={styles.updateContainer} ref={modalRef}>
        <div className={styles.titleContainer}>
          <p>Modifier {book.title}</p>
          <button onClick={onClose} className={styles.closeButton}>
            <IoCloseOutline size={40} />
          </button>
        </div>
        <div className={styles.editTitleContainer}>
          <p className={styles.title}>Titre:</p>
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
          <p className={styles.ownedTitle}>Volumes possédés:</p>
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
            <button onClick={() => setTotalVolumes((v) => v + 1)} type="button">
              +
            </button>
          </div>
        </div>

        <div className={styles.readContainer}>
          <p className={styles.readTitle}>Volumes lus:</p>
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
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className={styles.saveButton}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default UpdateModal;
