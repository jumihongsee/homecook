'use client';
import { useRouter } from 'next/navigation';
import styles from './boardList.module.scss';
import LikeButton from '@/app/components/elements/buttons/likeButton';
import { useEffect, useState } from 'react';
import EditButton from '@/app/components/elements/buttons/recipeEditButton';
import DeleteButton from '@/app/components/elements/buttons/recipeDeleteButton';

export default function BoardUI(props) {
  // 검색 리스트일 경우 json.parse 를 해주면 안된다.
  let data = '';
  if (props.status === 'search') {
    data = props.data;
  } else {
    data = JSON.parse(props.data);
  }

  const router = useRouter();
  const [loginUser, setLoginUser] = useState(null);

  const [userLikesBoard, setUserLikesBoard] = useState([]);

  useEffect(() => {
    const fetchUserLikes = async () => {
      const res = await fetch('/api/user/likelist');
      const data = await res.json();
      const userBoardList = data.userLikesBoard;
      setUserLikesBoard(userBoardList);
      setLoginUser(data.userLogin);
    };
    fetchUserLikes();
  }, []);

  return (
    <>
      <section
        className={`${styles.boardList} ${props.status === 'search' ? styles.searchList : ''}`}
      >
        <section>
          {data.length > 0 && (
            <div className={styles.titleWrapper}>
              <h2 className={styles.boardTitle}>
                {props.status === 'search' && props.searchTitle?.length > 0 && (
                  <>
                    <strong>'{props.searchTitle}' </strong>로 검색된
                  </>
                )}
                <strong> {data.length}</strong>개의 전체 레시피
              </h2>
              <p>맛있는 한끼를 위하여!</p>
            </div>
          )}
        </section>

        <ul className={styles.recipeWrapper}>
          {data.map((item, index) => {
            const likesStatus = userLikesBoard?.includes(item._id.toString());

            return (
              <li className={styles.recipeBox} key={index}>
                <article>
                  <div className={styles.imgBox}>
                    <div className={styles.topTag}>
                      <div className={styles.category}>
                        {item.thema === 'simple' && <p>간단요리</p>}
                        {item.thema === 'diet' && <p>다이어트</p>}
                        {item.thema === 'vegan' && <p>비건요리</p>}
                        {item.thema === 'ramen' && <p>라면변신</p>}
                        {item.thema === 'drink' && <p>혼술안주</p>}
                      </div>
                      <LikeButton boardId={item._id} likes={item.likes} likesStatus={likesStatus} />
                    </div>
                    <img
                      src={item.imgSrc ? item.imgSrc : '/test.png'}
                      alt={item.title ? item.title + '의 이미지' : '레시피 이미지'}
                      onClick={() => {
                        router.push(`/board/detail/${item._id}`);
                        router.refresh();
                      }}
                    />
                    {item.author === loginUser && (
                      <div className={styles.modifyButton}>
                        <EditButton boardId={item._id} />
                        <DeleteButton boardId={item._id} imgSrc={item.imgSrc} />
                      </div>
                    )}
                  </div>
                  <div className={styles.bottomInfo}>
                    <div>
                      <h3>{item?.title}</h3>
                      <p>{item?.script}</p>
                    </div>
                    <ul className={styles.labelList}>
                      <li>{item?.authorName}</li>
                      <li>{item.time}분 이내</li>
                      <li>
                        {item.difficulty === 'easy' && <span>쉬움</span>}
                        {item.difficulty === 'normal' && <span>보통</span>}
                        {item.difficulty === 'hard' && <span>어려움</span>}
                      </li>
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
