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

    if (book.totalRead === 0) {
      notStarted++;
    } else if (book.totalRead < book.totalVolumes) {
      inProgress++;
    } else {
      finished++;
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
          <div className={styles.statSum}>
            <h1 className={styles.statTitle}>Ma collection</h1>
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
            <h2 className={styles.pieTitle}>Stats de lecture</h2>
            <PieChartComponent data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
