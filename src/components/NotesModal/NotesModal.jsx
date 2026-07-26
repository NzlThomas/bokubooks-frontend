import { useRef, useEffect } from "react";
import styles from "./NotesModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";
import FocusTrap from "focus-trap-react";

function NotesModal({ book, onClose, editNotes }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <FocusTrap>
        <div className={styles.notesContainer} ref={modalRef}>
          <div className={styles.topRow}>
            <h2>{book.title}</h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              title="Fermer"
            >
              <IoCloseOutline size={40} />
            </button>
          </div>

          <div className={styles.notesFlex}>
            <div className={styles.noteParagraph}>
              {book.notes ? (
                <p>{book.notes}</p>
              ) : (
                <>
                  <p className={styles.emptyNote}>
                    Vous n'avez pas encore ajouté de note.
                  </p>

                  <div className={styles.infoBox}>
                    💡 Vous pouvez utiliser cette section pour noter les tomes
                    manquants, le nom de l'auteur ou toute autre information
                    utile concernant cette série.
                  </div>
                </>
              )}
            </div>

            <div className={styles.buttonIconContainer}>
              <button
                onClick={editNotes}
                className={styles.updateBtn}
                type="button"
              >
                {book.notes ? "Modifier la note" : "Ajouter une note"}{" "}
              </button>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}

export default NotesModal;
