import { useState, useEffect } from "react";
import WishlistAddModal from "../WishlistAddModal/WishlistAddModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import api from "../../api/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        setWishlist(res.data.wishlist);
      } catch (error) {
        console.error(error);
      }
    };
    getWishlist();
  }, []);

  async function addWish(title) {
    try {
      if (title.trim().length === 0) {
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
    } catch (error) {
      console.error(error);
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
      setDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        name="search"
        placeholder="Rechercher un livre..."
      />

      <button onClick={() => setAddModal(true)}>++++</button>
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

      {wishlist.length ? (
        wishlist
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map((book) => (
            <div key={book.id}>
              <p>{book.title}</p>
              <button onClick={() => handleDelete(book)}>Supprimer</button>
            </div>
          ))
      ) : (
        <p>Votre liste de souhaits est vide !</p>
      )}
    </div>
  );
}

export default Wishlist;
