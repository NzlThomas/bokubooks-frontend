import { useEffect, useState } from "react";
import api from "../../api/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import CollectionMap from "../CollectionMap/CollectionMap";

function Collection() {
  const [collection, setCollection] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const collection = async () => {
      try {
        const res = await api.get("/collection");
        setCollection(res.data.collection);
      } catch (error) {
        console.error(error);
      }
    };
    collection();
  }, []);

  async function handleDelete(book) {
    setSelectedBook(book);
    setDeleteModal(true);
  }

  async function handleUpdate(book) {
    setSelectedBook(book);
    setUpdateModal(true);
  }

  async function confirmDelete() {
    try {
      await api.delete("/collection", {
        data: { id: selectedBook.id },
      });
      setCollection((prevCollection) =>
        prevCollection.filter((book) => book.id !== selectedBook.id),
      );
      setDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmUpdate(id, title, totalRead, totalVolumes) {
    try {
      if (title.trim().length === 0) {
        setError("Erreur: Titre obligatoire");
        return;
      }

      if (totalVolumes < 1) {
        setError("Erreur: Vous devez posséder au minimum 1 volume.");
        return;
      }

      if (totalRead > totalVolumes) {
        setError(
          "Erreur: Les volumes lus ne peuvent pas dépasser les volumes possédés.",
        );
        return;
      }

      const res = await api.put("/collection", {
        id,
        title,
        totalRead,
        totalVolumes,
      });
      setCollection((prev) =>
        prev.map((book) => (book.id === id ? res.data.updatedBook : book)),
      );
      setDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <CollectionMap
        collection={collection}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {deleteModal && selectedBook && (
        <DeleteModal
          title={selectedBook.title}
          onConfirm={confirmDelete}
          onCancel={() => {
            (setDeleteModal(false), setSelectedBook(null));
          }}
          message="de votre collection "
        />
      )}

      {updateModal && selectedBook && (
        <UpdateModal
          book={selectedBook}
          onConfirm={confirmUpdate}
          onClose={() => {
            (setUpdateModal(false), setSelectedBook(null));
          }}
        />
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Collection;
