import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <h2>HOME COOK</h2>
        <nav>
          <a href="/recipes">전체 레시피</a>
          <a href="/register">레시피 등록</a>
          <a href="/mypage">마이페이지</a>
          <a href="/contact">문의하기</a>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 Hong Jumi. All rights reserved</p>
      </div>
    </footer>
  );
}
