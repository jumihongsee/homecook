import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadWrapp}>
      <div className={styles.load1}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}
