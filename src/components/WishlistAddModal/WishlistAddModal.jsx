import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./WishlistAddModal.module.css";
import { IoCloseOutline } from "react-icons/io5";

function WishlistAddModal({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = useCallback(() => {
    onAdd(title);
    setTitle("");
  }, [onAdd, title]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
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
  }, [onCancel, handleSubmit]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer} ref={modalRef}>
        <div className={styles.topRow}>
          <p>Titre:</p>
          <input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            autoFocus
          />
          <button
            onClick={onCancel}
            type="button"
            className={styles.closeButton}
          >
            <IoCloseOutline size={40} />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className={styles.addButton}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default WishlistAddModal;
