import styles from './boardDetail.module.scss';

export default function BoardDetailUI(props) {
  return (
    <section className={styles.boardDetail}>
      <div className={styles.recipeWrapper}>
        <div className={styles.leftRecipeInfo}>
          <div className={styles.imgBox}>
            <img alt="레시피 이미지" src={props.data?.imgSrc} />
          </div>
          <div className={styles.simpleInfo}>
            <div className={styles.user}>
              <div>
                {props.userImage ? (
                  <img
                    className={styles.fullImage}
                    src={props?.userImage}
                    alt="레시피 등록 유저의 프로필 이미지"
                  />
                ) : (
                  <img
                    className={styles.defaultImg}
                    src={'/user/default_user.svg'}
                    alt="레시피 등록 유저의 프로필 이미지"
                  />
                )}
              </div>

              <div>
                <h2>{props?.userName}</h2>
                <p>{props.data?.author}</p>
              </div>
            </div>
            <div className={styles.tag}>
              {props.data?.thema === 'simple' && <div># 간단요리</div>}
              {props.data?.thema === 'diet' && <div># 다이어트</div>}
              {props.data?.thema === 'vegan' && <div># 비건요리</div>}
              {props.data?.thema === 'ramen' && <div># 라면변신</div>}
              {props.data?.thema === 'drink' && <div># 혼술안주</div>}

              <div># {props.data?.time}분이내</div>
            </div>
            <div className={styles.likes}>
              <img src="/board/heart.png" alt="좋아요 이미지" />
              <p>20</p>
            </div>
          </div>
        </div>
        <div className={styles.rightRecipeInfo}>
          <div className={styles.topTitle}>
            <h2>{props.data?.title}</h2>
            <p>{props.data?.script}</p>
          </div>
          <div className={styles.ingredients}>
            <div>
              <img src="/board/check.png" alt="체크 이미지" />
              <h2>재료 Ingredient</h2>
            </div>
            <div className={styles.ingredientBox}>
              {props.data?.ingredient.map((item, index) => (
                <div className={styles.item} key={index}>
                  <h2>{item.name}</h2>
                  <p>
                    {item.quantity} ( {item.gram}그램 )
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.step}>
            <div>
              <img src="/board/check.png" alt="체크 이미지" />
              <h2>요리순서 Step</h2>
            </div>
            <div className={styles.stepBox}>
              {props.data?.step.map((item, index) => (
                <div key={index}>
                  <div className={styles.number}>{index + 1}</div>
                  <div className={styles.stepDetail}>{item?.step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
