import { useState } from "react";
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

  function getBookStatus(book) {
    if (book.totalRead === 0) {
      return "notStarted";
    } else if (book.totalRead < book.totalVolumes) {
      return "reading";
    } else {
      return "finished";
    }
  }

  function getTag(book) {
    if (book.totalRead === 0) {
      return styles.tagNotStarted;
    } else if (book.totalRead < book.totalVolumes) {
      return styles.tagReading;
    } else {
      return styles.tagFinished;
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
      <div className={styles.searchContainer}>
        <span className={styles.inputIconContainer}>
          <input
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
                  <p>{book.title}</p>
                  <div className={styles.bottomLine}>
                    <div className={styles.bookNotes}>
                      <span className={styles.readCount} title="Volumes lus">
                        <FaEye className={styles.otherIcons} /> {book.totalRead}
                        /{book.totalVolumes}
                      </span>
                      <button
                        onClick={() => onOpen(book)}
                        className={styles.notesButton}
                        title="Notes"
                      >
                        <FaNoteSticky className={styles.otherIcons} />
                      </button>
                    </div>

                    <div className={styles.actions}>
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
                  <p className={getTag(book)}>
                    {book.totalRead === 0
                      ? "À lire"
                      : book.totalRead < book.totalVolumes
                        ? "En cours"
                        : "Lu"}
                  </p>
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
