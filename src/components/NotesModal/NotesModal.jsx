import { useRef, useEffect } from "react";
import styles from "./NotesModal.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

function NotesModal({ book, onClose, editNotes }) {
  const modalRef = useRef(null);

  function showInformation() {
    toast.info(`Tracker ne gère pas les volumes de votre collection
                individuellement, il est donc préférable de noter les volumes
                manquants pour chaque série de votre collection.`);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.notesContainer} ref={modalRef}>
        <div className={styles.topRow}>
          <p>{book.title}</p>
          <button onClick={onClose} className={styles.closeButton}>
            <IoCloseOutline size={40} />
          </button>
        </div>

        <div className={styles.notesFlex}>
          <div className={styles.noteParagraph}>
            <p>
              {book.notes
                ? book.notes
                : "Vous n'avez pas encore ajouté de notes."}
            </p>
          </div>

          <div className={styles.buttonIconContainer}>
            <button
              onClick={editNotes}
              className={styles.updateBtn}
              type="button"
            >
              {book.notes ? "Modifier la note" : "Ajouter une note"}{" "}
            </button>

            <button
              onClick={() => showInformation()}
              className={styles.informationButton}
              title="Information"
            >
              <IoMdInformationCircle size={30} />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default NotesModal;
