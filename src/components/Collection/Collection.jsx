import { useEffect, useState } from "react";
import api from "../../api/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import CollectionMap from "../CollectionMap/CollectionMap";
import { ToastContainer, toast } from "react-toastify";
import NotesModal from "../NotesModal/NotesModal";

function Collection() {
  const [collection, setCollection] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const collection = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/collection");
        setCollection(res.data.collection);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    collection();
  }, []);

  async function handleEditNotes() {
    setNotesModal(false);
    setUpdateModal(true);
  }

  async function handleDelete(book) {
    setSelectedBook(book);
    setDeleteModal(true);
  }

  async function handleUpdate(book) {
    setSelectedBook(book);
    setUpdateModal(true);
  }

  async function handleViewNote(book) {
    setSelectedBook(book);
    setNotesModal(true);
  }

  async function confirmDelete() {
    try {
      await api.delete("/collection", {
        data: { id: selectedBook.id },
      });
      setCollection((prevCollection) =>
        prevCollection.filter((book) => book.id !== selectedBook.id),
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

  async function confirmUpdate(id, title, totalRead, totalVolumes, notes) {
    try {
      if (title.trim().length === 0) {
        toast.error("Titre obligatoire");
        return;
      }

      if (totalVolumes < 1) {
        toast.error(
          "Vous devez posséder au minimum 1 volume. Appuyez sur la poubelle si vous souhaitez supprimer cette entrée.",
        );
        return;
      }

      if (totalRead > totalVolumes) {
        toast.error(
          "Les volumes lus ne peuvent pas excéder les volumes possédés.",
        );
        return;
      }

      const res = await api.put("/collection", {
        id,
        title,
        totalRead,
        totalVolumes,
        notes,
      });
      setCollection((prev) =>
        prev.map((book) => (book.id === id ? res.data.updatedBook : book)),
      );
      setDeleteModal(false);
      setSelectedBook(null);
      toast.success(`${title} a bien été mis à jour!`);
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
        onOpen={handleViewNote}
        isLoading={isLoading}
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

      {notesModal && selectedBook && (
        <NotesModal
          book={selectedBook}
          onClose={() => {
            (setNotesModal(false), setSelectedBook(null));
          }}
          editNotes={handleEditNotes}
        />
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

export default Collection;
