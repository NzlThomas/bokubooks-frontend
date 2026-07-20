import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./WishlistAddModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import FocusTrap from "focus-trap-react";

function WishlistAddModal({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = useCallback(() => {
    onAdd(title);
    setTitle("");
  }, [onAdd, title]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel, handleSubmit]);

  return (
    <div className={styles.overlay}>
      <FocusTrap>
        <form className={styles.modalContainer} ref={modalRef}>
          <div className={styles.topRow}>
            <label htmlFor="title">Titre:</label>
            <input
              id="title"
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
              title="Fermer"
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
        </form>
      </FocusTrap>
    </div>
  );
}

export default WishlistAddModal;
