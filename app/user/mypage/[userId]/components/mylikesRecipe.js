import LikeButton from '@/app/components/elements/buttons/likeButton';
import styles from '../mypage.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyLikesRecipeList(props) {
  const router = useRouter();
  const [likeData, setLikeData] = useState([]);
  useEffect(() => {
    setLikeData(props.data);
  }, [props.data]);
  const unLike = boardId => {
    const update = likeData.filter(item => item._id !== boardId);
    setLikeData(update);
  };
  return (
    <div className={styles.likesList}>
      <ul>
        {likeData?.map(item => (
          <li key={item._id}>
            <div className={styles.topImgSection}>
              <LikeButton boardId={item._id} likesStatus={true} unLike={unLike} />
              <img
                src={item.imgSrc ? item.imgSrc : '/test.png'}
                alt="레시피 이미지"
                onClick={() => {
                  router.push(`/board/detail/${item._id}`);
                }}
              />
            </div>
            <div className={styles.infoSection}>
              <h2>{item.title}</h2>
              <p className={styles.scirpt}>{item.script}</p>
              {item.ingredient?.map((item, index) => (
                <span className={styles.ingredient} key={index}>
                  {item.name}
                </span>
              ))}

              <div className={styles.tag}>
                <div>
                  {item.thema === 'simple' && <div># 간단요리</div>}
                  {item.thema === 'diet' && <div># 다이어트</div>}
                  {item.thema === 'vegan' && <div># 비건요리</div>}
                  {item.thema === 'ramen' && <div># 라면변신</div>}
                  {item.thema === 'drink' && <div># 혼술안주</div>}
                </div>
                <div>쉬움</div>
                <div>{item.time}분</div>
              </div>
              <div className={styles.author}>
                <p>{item.author}의 레시피</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
