import styles from "./LoadingStats.module.css";

function LoadingStats() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.firstBlock} />
      <div className={styles.secondBlock} />
    </div>
  );
}

export default LoadingStats;
