import { useRef, useEffect } from "react";
import styles from "./DeleteModal.module.css";
import FocusTrap from "focus-trap-react";

function DeleteModal({ title, onConfirm, onCancel, message }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className={styles.overlay}>
      <FocusTrap>
        <div className={styles.deleteContainer} ref={modalRef}>
          <div className={styles.textContainer}>
            <p>
              Supprimer <span className={styles.bookToDelete}>{title}</span>
              <span> {message}</span>?
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
      </FocusTrap>
    </div>
  );
}

export default DeleteModal;
