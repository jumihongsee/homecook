'use client';
import { Time } from '@/app/components/util/time';
import styles from '../boardDetail.module.scss';
import { useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

export default function BoardCommentList(props) {
  const data = props.data;
  const session = useSession();

  const [editCommentId, setEditCommentId] = useState(null);
  const [commentEdit, setCommentEdit] = useState('');
  const editTextAreaRef = useRef(null);

  let loginUser = '';
  if (session) {
    loginUser = session.data?.user?.email;
  }

  const handleDelete = async commentId => {
    const result = await fetch(`/api/comment/delete/${commentId}`, {
      method: 'DELETE',
    });
    if (result.ok) {
      props.fetchListData();
    }
  };

  const handleUpdate = async id => {
    const result = await fetch(`/api/comment/commentupdate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId: editCommentId, content: commentEdit }),
    });
    if (result.ok) {
      props.fetchListData();
      setEditCommentId(null);
      setCommentEdit('');
    }
  };

  // focus + 높이 자동 조절
  useEffect(() => {
    if (editTextAreaRef.current) {
      const el = editTextAreaRef.current;
      el.focus();
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [editCommentId]);

  return (
    <div className={styles.commentsList}>
      <div className={styles.topTitle}>
        <img src="/board/comment.png" alt="체크 이미지" />
        <h2>댓글 Comments</h2>
      </div>
      {data.map((item, index) => (
        <div className={styles.commentBox} key={index}>
          <div className={styles.userInfo}>
            <div className={styles.leftSection}>
              <h3>
                {item.name ? item.name : item.author} <span>{Time(item.createdAt)}</span>
              </h3>
            </div>
            {loginUser === item.author && (
              <div className={styles.rightSection}>
                {editCommentId === item._id ? (
                  <>
                    <button className={styles.editCommit} onClick={() => handleUpdate()}>
                      등록하기
                    </button>
                    <button
                      className={styles.closeEdit}
                      onClick={() => {
                        setEditCommentId(null);
                        setCommentEdit('');
                      }}
                    >
                      <img src="/board/close.png" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditCommentId(item._id);
                        setCommentEdit(item.comments);
                      }}
                    >
                      수정
                    </button>
                    <button onClick={() => handleDelete(item._id)}>삭제</button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={styles.content}>
            {editCommentId === item._id ? (
              <textarea
                ref={editTextAreaRef}
                value={commentEdit}
                onChange={e => {
                  setCommentEdit(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                style={{ resize: 'none', overflow: 'hidden' }}
              />
            ) : (
              <p>{item.comments}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
