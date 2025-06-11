'use client';
import { Time } from '@/app/components/util/time';
import styles from '../mypage.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyCommentList(props) {
  const router = useRouter();
  const [commentData, setCommentData] = useState();

  useEffect(() => {
    // commentData state에 데이터 넣기
    setCommentData(props.data);
  }, [props.data]);

  const handleDelete = async commentId => {
    const result = await fetch(`/api/comment/delete/${commentId}`, {
      method: 'DELETE',
    });
    if (result.ok) {
      // 댓글 삭제가 완료시 commentData의 배열을 filter로 삭제한 댓글 아이디와 일치하지 않는 것만 걸러내어 재배열
      const updateList = commentData.filter(item => item._id !== commentId);
      // 필터링 된 배열을 다시 commentData state에 넣어준다
      setCommentData(updateList);
      // 부모로 부터 받아온 카운트 개수 업데이트
      props.count(updateList.length);
    }
  };
  return (
    <div className={styles.commentList}>
      <ul>
        {commentData?.map(item => (
          <li key={item._id}>
            <div className={styles.topInfo}>
              <div>
                <h2
                  onClick={() => {
                    router.push(`/board/detail/${item.parentBoardId}`);
                  }}
                >
                  {item.withBoardTitle?.title ? item.withBoardTitle.title : 'null'}
                </h2>
                <p>{Time(item.createdAt)}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
            <p>{item.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
