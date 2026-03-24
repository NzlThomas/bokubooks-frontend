import styles from "./LoadingBlocks.module.css";

function LoadingBlocks() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.loadingBlock} />
      <div className={styles.loadingBlock} />
      <div className={styles.loadingBlock} />
    </div>
  );
}

export default LoadingBlocks;
