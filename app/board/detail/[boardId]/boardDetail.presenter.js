import LikeButton from '@/app/components/elements/buttons/likeButton';
import styles from './boardDetail.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import BoardComment from './comment/boardDetailComment';
import EditButton from '@/app/components/elements/buttons/recipeEditButton';
import DeleteButton from '@/app/components/elements/buttons/recipeDeleteButton';

export default async function BoardDetailUI(props) {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db('homecook');
  let loginUser = '';
  if (session) {
    loginUser = await db.collection('users').findOne({
      email: session.user.email,
    });
  }
  const likesBoardData = loginUser.likesBoard;
  // 유저의 좋아요 여부 확인 > likebutton 으로 상태값 전달
  const likesStatus = likesBoardData?.includes(props.boardId);

  return (
    <section className={styles.boardDetail}>
      <div className={styles.recipeWrapper}>
        <div className={styles.leftRecipeInfo}>
          <div className={styles.imgBox}>
            <img alt="레시피 이미지" src={props.data?.imgSrc ? props.data?.imgSrc : '/test.png'} />
            {props.data?.author === loginUser.email && (
              <div className={styles.buttons}>
                <EditButton boardId={props.boardId} editData={props.data} />
                <DeleteButton boardId={props.boardId} imgSrc={props.data?.imgSrc} />
              </div>
            )}
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
              <div className={styles.likes}>
                <LikeButton
                  boardId={props.boardId}
                  likes={props.data.likes}
                  likesStatus={likesStatus}
                />
              </div>
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
                    {item.quantity && `( ${item.quantity} )개`}
                    {item.gram && `( ${item.gram} )그램`}
                    {!item.quantity && !item.gram && `( 취향것 )`}
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
          <BoardComment boardId={props.boardId} author={props.data.author} />
        </div>
      </div>
    </section>
  );
}
