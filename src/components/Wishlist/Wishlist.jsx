import { useState, useEffect } from "react";
import WishlistAddModal from "../WishlistAddModal/WishlistAddModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api/api";
import styles from "./Wishlist.module.css";
import LoadingBlocks from "../LoadingBlocks/LoadingBlocks";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = wishlist.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch;
  });

  const visibleBooks = filtered.slice(0, visibleCount);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/wishlist");
        setWishlist(res.data.wishlist);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getWishlist();
  }, []);

  async function addWish(title) {
    try {
      if (title.trim().length === 0) {
        toast.error("Titre obligatoire");
        return;
      }
      const res = await api.post("/wishlist", {
        title,
      });

      const newBook = res.data.newBook;
      setWishlist((prev) => [
        { id: newBook.id, title: newBook.title },
        ...prev,
      ]);
      setAddModal(false);
      toast.success(`${title} a bien été ajouté à votre liste de souhaits!`);
    } catch (error) {
      const { error: code } = error.response.data;

      switch (code) {
        case "ALREADY_IN_WISHLIST":
          toast.warn(`${title} est déjà dans votre liste de souhaits.`);
          break;
        case "ALREADY_IN_COLLECTION":
          toast.warn(`${title} est déjà dans votre collection.`);
          break;
        default:
          toast.error("Une erreur est survenue.");
      }
    }
  }

  async function handleDelete(book) {
    setSelectedBook(book);
    setDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      await api.delete("/wishlist", {
        data: { id: selectedBook.id },
      });
      setWishlist((prevWish) =>
        prevWish.filter((book) => book.id !== selectedBook.id),
      );
      toast.success(
        `${selectedBook.title} a bien été supprimé de votre liste de souhaits!`,
      );
      setDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <span className={styles.inputIconContainer}>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Rechercher un livre..."
          />

          <FaMagnifyingGlass size={25} />
        </span>

        <button onClick={() => setAddModal(true)} className={styles.addButton}>
          <BsFillPlusCircleFill size={35} />{" "}
          <span className={styles.addSpan}>Ajouter</span>
        </button>
      </div>

      {addModal && (
        <WishlistAddModal onAdd={addWish} onCancel={() => setAddModal(false)} />
      )}

      {deleteModal && selectedBook && (
        <DeleteModal
          title={selectedBook.title}
          onConfirm={confirmDelete}
          onCancel={() => {
            (setDeleteModal(false), setSelectedBook(null));
          }}
          message="votre liste de souhaits "
        />
      )}

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <div className={styles.cardsContainer}>
          {wishlist.length === 0 ? (
            <p className={styles.noBooks}>
              Votre liste de souhaits est vide...
            </p>
          ) : visibleBooks.length === 0 ? (
            <p className={styles.noBooks}>Aucun livre trouvé...</p>
          ) : (
            visibleBooks.map((book) => (
              <div key={book.id} className={styles.bookContainer}>
                <p>{book.title}</p>
                <button onClick={() => handleDelete(book)}>
                  <FaTrashCan size={25} />
                </button>
              </div>
            ))
          )}
          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((count) => count + 20)}
              className={styles.seeMore}
              type="button"
            >
              Voir plus
            </button>
          )}
        </div>
      )}

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

export default Wishlist;
