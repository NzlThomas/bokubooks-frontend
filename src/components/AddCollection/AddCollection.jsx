import { useState } from "react";
import api from "../../api/api";
import styles from "./AddCollection.module.css";
import { ToastContainer, toast } from "react-toastify";

function AddCollection() {
  const [title, setTitle] = useState("");
  const [totalVolumes, setTotalVolumes] = useState(0);
  const [totalRead, setTotalRead] = useState(0);

  async function handleAddBook(e) {
    e.preventDefault();

    try {
      if (title.trim().length === 0) {
        toast.error("Titre obligatoire");
        return;
      }

      if (totalVolumes < 1) {
        toast.error("Vous devez posséder au minimum 1 volume.");
        return;
      }

      if (totalRead > totalVolumes) {
        toast.error(
          "Les volumes lus ne peuvent pas excéder les volumes possédés.",
        );
        return;
      }

      await api.post("/collection", {
        title,
        totalRead,
        totalVolumes,
      });
      toast.success(`${title} a bien été ajouté à votre collection!`);
      setTitle("");
      setTotalVolumes(0);
      setTotalRead(0);
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

        <button type="submit" className={styles.button}>
          Ajouter
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default AddCollection;
