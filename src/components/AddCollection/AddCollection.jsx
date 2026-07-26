import { useState, useEffect } from "react";
import api from "../../api/api";
import { validateBook } from "../../utils/bookValidation";
import styles from "./AddCollection.module.css";
import { ToastContainer, toast } from "react-toastify";

function AddCollection() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [totalVolumes, setTotalVolumes] = useState(1);
  const [totalRead, setTotalRead] = useState(0);
  const [tag, setTag] = useState(null);
  const [hasManuallySelectedStatus, setHasManuallySelectedStatus] =
    useState(false);

  function getSuggestedStatus(totalVolumes, totalRead) {
    if (!totalVolumes || totalVolumes === 0) {
      return "TO_READ";
    }

    if (totalRead === 0) {
      return "TO_READ";
    }

    if (totalRead >= totalVolumes) {
      return "READ";
    }

    return "READING";
  }

  const displayedTag = hasManuallySelectedStatus
    ? tag
    : getSuggestedStatus(Number(totalVolumes), Number(totalRead));

  useEffect(() => {
    document.title = "Bokubooks | Ajouter un livre";
  }, []);

  async function handleAddBook(e) {
    e.preventDefault();

    try {
      const error = validateBook(title, totalVolumes, totalRead, tag);

      if (error) {
        toast.error(error);
        return;
      }

      await api.post("/collection", {
        title,
        totalRead,
        totalVolumes,
        notes,
        readingStatus: displayedTag,
      });
      toast.success(`${title} a bien été ajouté à votre collection!`);
      setTitle("");
      setTotalVolumes(1);
      setTotalRead(0);
      setTag(null);
      setHasManuallySelectedStatus(false);
      setNotes("");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warn(`${title} est déjà dans votre collection!`);
      } else {
        console.error(error);
      }
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.srOnly}>Ajouter un livre à ma collection</h1>
      <form onSubmit={handleAddBook} className={styles.form}>
        <div className={styles.titleContainer}>
          <label htmlFor="title" className={styles.title}>
            Titre:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className={styles.volumesContainer}>
          <div className={styles.ownedContainer}>
            <label htmlFor="totalVolumes" className={styles.title}>
              <span>Volumes</span> <span>possédés:</span>
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
            <label htmlFor="totalRead" className={styles.title}>
              <span>Volumes</span> <span>lus:</span>
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
          </div>
        </div>

        <div className={styles.tagContainer}>
          <label htmlFor="readingStatus" className={styles.title}>
            Avancement:
          </label>
          <div className={styles.tagBtnContainer}>
            <button
              onClick={() => {
                setTag("TO_READ");
                setHasManuallySelectedStatus(true);
              }}
              type="button"
              className={[
                styles.toReadBtn,
                displayedTag === "TO_READ" ? styles.toReadActive : "",
              ].join(" ")}
            >
              À lire
            </button>
            <button
              onClick={() => {
                setTag("READING");
                setHasManuallySelectedStatus(true);
              }}
              type="button"
              className={[
                styles.readingBtn,
                displayedTag === "READING" ? styles.readingActive : "",
              ].join(" ")}
            >
              En cours
            </button>
            <button
              onClick={() => {
                setTag("READ");
                setHasManuallySelectedStatus(true);
              }}
              type="button"
              className={styles.finishedBtn}
              className={[
                styles.finishedBtn,
                displayedTag === "READ" ? styles.finishedActive : "",
              ].join(" ")}
            >
              Lu
            </button>
          </div>
        </div>

        <div className={styles.notesContainer}>
          <label htmlFor="notes">Note:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={`Ajouter une note`}
            className={styles.notesArea}
            name="notes"
            id="notes"
          />
        </div>

        <button type="submit" className={styles.button}>
          Ajouter
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default AddCollection;
