'use client';
import DeleteButton from '@/app/components/elements/buttons/recipeDeleteButton';
import styles from '../mypage.module.scss';
import EditButton from '@/app/components/elements/buttons/recipeEditButton';
import { useRouter } from 'next/navigation';
export default function MyRecipeList(props) {
  console.log(props.data);
  const router = useRouter();
  return (
    <div className={styles.recipeList}>
      <ul>
        {props.data?.map((item, index) => (
          <li key={index}>
            <article>
              <div className={styles.imgBox}>
                <div className={styles.modifybuttons}>
                  <EditButton boardId={item._id} />
                  <DeleteButton boardId={item._id} imgSrc={item.imgSrc} />
                </div>
                <img
                  src={item.imgSrc ? `${item.imgSrc}` : '/test.png'}
                  onClick={() => {
                    router.push(`/board/detail/${item._id}`);
                  }}
                />
              </div>
              <div className={styles.recipeInfoWrapper}>
                <div className={styles.topSection}>
                  <h2>{item.title}</h2>
                  <p>2025.04.12</p>
                </div>
                <div className={styles.recipeScript}>
                  <p>{item.script}</p>
                </div>

                <div className={styles.recipeTag}>
                  <div>
                    {item.difficulty === 'easy' && <p>#쉬움</p>}
                    {item.difficulty === 'normal' && <p>#보통</p>}
                    {item.difficulty === 'difficult' && <p>#어려움</p>}
                  </div>
                  <div>
                    <p>
                      #
                      {item.time === '10' || item.time === '20' || item.time === '30'
                        ? item.time
                        : ''}
                      분
                    </p>
                  </div>
                  <div>
                    {item.thema === 'simple' && <p>간단요리</p>}
                    {item.thema === 'diet' && <p>다이어트</p>}
                    {item.thema === 'vegan' && <p>비건요리</p>}
                    {item.thema === 'ramen' && <p>라면변신</p>}
                    {item.thema === 'drink' && <p>혼술안주</p>}
                  </div>
                </div>
                <div className={styles.recipeStatus}>
                  <div>
                    <img src="/user/mypageHeart.svg" />
                    <p>{item.likes ? item.likes : '0'}</p>
                  </div>
                  <div>
                    <img src="/user/mypageComment.svg" />
                    <p>{item.commentCount}</p>
                  </div>
                  <div>
                    <img src="/user/mypageView.svg" />
                    <p>{item.viewCount}</p>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
