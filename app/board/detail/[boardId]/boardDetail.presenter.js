import styles from './boardDetail.module.scss';

export default function BoardDetailUI({ data }) {
  console.log(data);
  return (
    <section className={styles.boardDeatil}>
      <div className={styles.title}>
        <h2>레시피 디테일</h2>
      </div>
      <div className={styles.recipeWrapper}>
        <div className={styles.leftRecipeInfo}>
          <img alt="레시피 이미지" />
        </div>
        <div className={styles.rightRecipeInfo}></div>
      </div>
    </section>
  );
}
