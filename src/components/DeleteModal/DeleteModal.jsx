import { useRef, useEffect } from "react";
import styles from "./DeleteModal.module.css";

function DeleteModal({ title, onConfirm, onCancel, message }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className={styles.overlay}>
      <div className={styles.deleteContainer} ref={modalRef}>
        <div className={styles.textContainer}>
          <p>
            Supprimer{" "}
            <span>
              {title} {message}
            </span>
            ?
          </p>
        </div>

        <div className={styles.buttonsContainer}>
          <button
            onClick={onConfirm}
            className={styles.confirmButton}
            type="button"
          >
            Oui
          </button>
          <button
            onClick={onCancel}
            className={styles.cancelButton}
            type="button"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
