'use client';
import { useState, useEffect } from 'react';
import styles from './button.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LikeButton(props) {
  const [like, setLike] = useState(props.likesStatus);
  // const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes || 0);
  const router = useRouter();

  // likes의 상태가 변화 했을때 그때 상태를 like에 반영해준다 > 리스트 용
  useEffect(() => {
    setLike(props.likesStatus);
  }, [props.likesStatus]);

  const session = useSession();

  console.log(props.likesStatus);

  const handleLike = likeInvert => {
    if (!session.data) return;

    fetch('/api/recipe/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardId: props.boardId,
        status: likeInvert,
        session,
      }),
    }).then(async r => {
      const res = await r.json();
      setLikeCount(res.likes);
      // console.log(res);

      // 리스트 > 디테일 페이지로 이동시 리프레시 해줘야 반영됨
      router.refresh();
      if (props.unLike) {
        props.unLike(props.boardId);
      }
    });
  };

  return (
    <button
      className={styles.likeButton}
      type="button"
      onClick={() => {
        if (!session.data) {
          alert('로그인후 사용할 수 있습니다.');
          router.push('/api/auth/signin');
          return;
        }
        const likeInvert = !like;
        setLike(likeInvert);
        handleLike(likeInvert);
      }}
    >
      {/* <img src= alt="좋아요 이미지" /> */}
      <img src={like ? '/board/heartfill.png' : '/board/heart.png'} />
      <p>{likeCount}</p>
    </button>
  );
}
