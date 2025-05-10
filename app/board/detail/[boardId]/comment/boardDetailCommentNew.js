'use client';
import { useState } from 'react';
import styles from '../boardDetail.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BoardCommentNew(props) {
  // 로그인 한 유저만 댓글을 달 수 있도록
  // 로그인 한 유저 session 가져오기
  // 댓글 내용(contents) + boardId + Author + createdAt

  const [comments, setComments] = useState();
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!comments.trim()) {
      alert('댓글 내용을 작성해 주세요');
      return;
    }
    if (!session?.data?.user) {
      alert('로그인 후 댓글작성이 가능합니다.');
      router.push('/api/auth/signin');
      return;
    }

    const data = {
      comments,
      author: session?.data?.user?.email,
      name: session?.data?.user?.name,
      createdAt: new Date(),
      boardId: props.boardId,
    };

    const result = await fetch('/api/comment/commentnew', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.ok) {
      props.fetchListData();
      setComments('');
    }
  };

  return (
    <div className={styles.commentsNew}>
      <form>
        <textarea
          placeholder="댓글을 작성해주세요."
          value={comments || ''}
          onChange={e => {
            setComments(e.target.value);

            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          댓글 작성
        </button>
      </form>
    </div>
  );
}
