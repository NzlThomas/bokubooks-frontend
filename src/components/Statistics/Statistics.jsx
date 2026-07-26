import { useState, useEffect } from "react";
import api from "../../api/api";
import PieChartComponent from "../PieChartComponent/PieChartComponent";
import styles from "./Statistics.module.css";
import LoadingStats from "../LoadingStats/LoadingStats";

function Statistics() {
  const [stats, setStats] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Bokubooks | Statistiques";

    const stats = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/stats");
        setStats(res.data.stats);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

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
    stats();
  }, []);

  let finished = 0;
  let inProgress = 0;
  let notStarted = 0;

  for (let i = 0; i < collection.length; i++) {
    const book = collection[i];

    if (book.readingStatus === "READ") {
      finished++;
    } else if (book.readingStatus === "READING") {
      inProgress++;
    } else if (book.readingStatus === "TO_READ") {
      notStarted++;
    }
  }

  const data = [
    { name: "Terminées", value: finished },
    { name: "En cours", value: inProgress },
    { name: "À lire", value: notStarted },
  ];

  return (
    <div className={styles.statsContainer}>
      {isLoading ? (
        <LoadingStats />
      ) : (
        <div>
          <h1 className={styles.srOnly}>Mes statistiques</h1>
          <div className={styles.statSum}>
            <h2 className={styles.statTitle}>Ma collection</h2>
            <p>
              <span>Séries possédées:</span> {stats.totalSeries}
            </p>
            <p>
              <span>Livres possédés:</span> {stats.ownedSum}
            </p>
            <p>
              <span>Livres lus:</span> {stats.readSum}
            </p>
          </div>

          <div className={styles.pieContainer}>
            <h3 className={styles.pieTitle}>Stats de lecture</h3>
            {collection.length === 0 ? (
              <p className={styles.noStats}>
                Ajoutez des livres à votre collection pour voir vos statistiques
                de lecture.
              </p>
            ) : (
              <PieChartComponent data={data} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
