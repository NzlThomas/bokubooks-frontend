import { useState, useEffect } from "react";
import styles from "./CollectionMap.module.css";
import LoadingBlocks from "../LoadingBlocks/LoadingBlocks";
import {
  FaMagnifyingGlass,
  FaTrashCan,
  FaDeleteLeft,
  FaNoteSticky,
} from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

function CollectionMap({ collection, onDelete, onUpdate, isLoading, onOpen }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    document.title = "Bokubooks | Collection";
  }, []);

  function getBookStatus(book) {
    if (book.readingStatus === "TO_READ") {
      return "notStarted";
    } else if (book.readingStatus === "READING") {
      return "reading";
    } else {
      return "finished";
    }
  }

  function getTagClass(book) {
    if (book.readingStatus === "TO_READ") {
      return styles.tagNotStarted;
    } else if (book.readingStatus === "READING") {
      return styles.tagReading;
    } else {
      return styles.tagFinished;
    }
  }

  function getTagText(book) {
    if (book.readingStatus === "TO_READ") {
      return "À lire";
    } else if (book.readingStatus === "READING") {
      return "En cours";
    } else {
      return "Lu";
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
    <div className={styles.collectionFlexContainer}>
      <h1 className={styles.srOnly}>Ma Collection</h1>
      <div className={styles.searchContainer}>
        <span className={styles.inputIconContainer}>
          <input
            aria-label="Rechercher un livre"
            placeholder="Rechercher un livre"
            onChange={(e) => {
              (setSearch(e.target.value), setVisibleCount(20));
            }}
            id="search"
            type="text"
            value={search}
          />
          <FaDeleteLeft
            onClick={() => setSearch("")}
            className={search ? styles.visible : styles.hidden}
          />
          <FaMagnifyingGlass className={styles.glass} />
        </span>

        <div className={styles.filtersContainer}>
          <button
            onClick={() => setStatusFilter("all")}
            type="button"
            className={[
              styles.allBtn,
              statusFilter === "all" ? styles.allActive : "",
            ].join(" ")}
          >
            Tous
          </button>
          <button
            onClick={() => setStatusFilter("notStarted")}
            type="button"
            className={[
              styles.toReadBtn,
              statusFilter === "notStarted" ? styles.toReadActive : "",
            ].join(" ")}
          >
            À lire
          </button>
          <button
            onClick={() => setStatusFilter("reading")}
            type="button"
            className={[
              styles.readingBtn,
              statusFilter === "reading" ? styles.readingActive : "",
            ].join(" ")}
          >
            En cours
          </button>
          <button
            onClick={() => setStatusFilter("finished")}
            type="button"
            className={[
              styles.finishedBtn,
              statusFilter === "finished" ? styles.finishedActive : "",
            ].join(" ")}
          >
            Lu
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <div className={styles.collectionContainer}>
          {collection.length === 0 ? (
            <p className={styles.noBooks}>Votre collection est vide...</p>
          ) : visibleBooks.length === 0 ? (
            <p className={styles.noBooks}>Aucun livre trouvé...</p>
          ) : (
            visibleBooks.map((book) => (
              <div
                key={book.id}
                className={[getBookStatus(book), styles.bookCard].join(" ")}
              >
                <div className={styles.cardInfos}>
                  <h2 className={styles.cardBookTitle}>{book.title}</h2>
                  <div className={styles.bottomLine}>
                    <div className={styles.bookNotes}>
                      <span className={styles.readCount} title="Volumes lus">
                        <FaEye className={styles.otherIcons} /> {book.totalRead}
                        /{book.totalVolumes}
                      </span>
                    </div>

                    <div className={styles.actions}>
                      <button
                        onClick={() => onOpen(book)}
                        className={styles.notesButton}
                        title="Notes"
                      >
                        <FaNoteSticky className={styles.otherIcons} />
                      </button>
                      <button
                        onClick={() => onUpdate(book)}
                        type="button"
                        title="Modifier"
                      >
                        <MdEdit className={styles.editIcon} />
                      </button>
                      <button
                        onClick={() => onDelete(book)}
                        type="button"
                        title="Supprimer"
                      >
                        <FaTrashCan className={styles.otherIcons} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.cardTag}>
                  <p className={getTagClass(book)}>{getTagText(book)}</p>
                </div>
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
    </div>
  );
}

export default CollectionMap;
