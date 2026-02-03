import { useState } from "react";

function CollectionMap({ collection, onDelete, onUpdate }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = collection.filter((books) =>
    books.title.toLowerCase().includes(search.toLowerCase()),
  );

  const visibleBooks = filtered.slice(0, visibleCount);

  return (
    <div>
      <input
        placeholder="Rechercher un livre"
        onChange={(e) => {
          (setSearch(e.target.value), setVisibleCount(20));
        }}
      />
      {collection.length === 0 ? (
        <p>Votre collection est vide...</p>
      ) : search.trim() !== "" && filtered.length === 0 ? (
        <p>Aucun livre trouvé...</p>
      ) : (
        visibleBooks.map((book) => (
          <div
            key={book.id}
            className={
              book.totalRead === 0
                ? "notSarted"
                : book.totalRead < book.totalVolumes
                  ? "reading"
                  : "finished"
            }
          >
            <p>{book.title}</p>
            <p>
              {book.totalRead}/{book.totalVolumes}
            </p>
            <p>
              Statut:{" "}
              {book.totalRead === 0
                ? "A lire"
                : book.totalRead < book.totalVolumes
                  ? "En cours"
                  : "Lu"}
            </p>
            <button onClick={() => onDelete(book)}>Supprimer</button>
            <button onClick={() => onUpdate(book)}>Modifier</button>
          </div>
        ))
      )}

      {visibleCount < filtered.length && (
        <button onClick={() => setVisibleCount((count) => count + 20)}>
          Voir plus
        </button>
      )}
    </div>
  );
}

export default CollectionMap;
