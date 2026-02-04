import { useState } from "react";

function CollectionMap({ collection, onDelete, onUpdate }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [statusFilter, setStatusFilter] = useState("all");

  function getBookStatus(book) {
    if (book.totalRead === 0) {
      return "notStarted";
    } else if (book.totalRead < book.totalVolumes) {
      return "reading";
    } else {
      return "finished";
    }
  }

  const filtered = collection.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || getBookStatus(book) === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const visibleBooks = filtered.slice(0, visibleCount);

  return (
    <div>
      <input
        placeholder="Rechercher un livre"
        onChange={(e) => {
          (setSearch(e.target.value), setVisibleCount(20));
        }}
        id="search"
      />
      <div>
        <button
          onClick={() => setStatusFilter("all")}
          style={{
            color: statusFilter === "all" ? "red" : "black",
          }}
        >
          Tous
        </button>
        <button
          onClick={() => setStatusFilter("notStarted")}
          style={{
            color: statusFilter === "notStarted" ? "red" : "black",
          }}
        >
          À lire
        </button>
        <button
          onClick={() => setStatusFilter("reading")}
          style={{
            color: statusFilter === "reading" ? "red" : "black",
          }}
        >
          En cours
        </button>
        <button
          onClick={() => setStatusFilter("finished")}
          style={{
            color: statusFilter === "finished" ? "red" : "black",
          }}
        >
          Lu
        </button>
      </div>

      {collection.length === 0 ? (
        <p>Votre collection est vide...</p>
      ) : visibleBooks.length === 0 ? (
        <p>Aucun livre trouvé...</p>
      ) : (
        visibleBooks.map((book) => (
          <div key={book.id} className={getBookStatus(book)}>
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
