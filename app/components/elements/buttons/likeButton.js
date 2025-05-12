'use client';
import { useState } from 'react';
import styles from './button.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LikeButton(props) {
  const [like, setLike] = useState(props.likesStatus);
  const [likeCount, setLikeCount] = useState(props.likes || 0);
  const router = useRouter();

  // 로그인시 session.data 들어옴
  // 미로그인시 session.data = null
  const session = useSession();

  console.log(like);

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
      console.log(res);
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
