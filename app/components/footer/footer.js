import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <h2>HOME COOK</h2>
        <nav>
          <a href="">전체 레시피</a>
          <a href="">레시피 검색</a>
          <a href="">레시피 등록</a>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 Hong Jumi. All rights reserved</p>
      </div>
    </footer>
  );
}
