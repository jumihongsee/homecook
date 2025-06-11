'use client';
import { useEffect, useState } from 'react';
import BoardCommentList from './boardDetailCommentList';
import BoardCommentNew from './boardDetailCommentNew';

export default function BoardComment(props) {
  const [comment, setComment] = useState([]);
  const listData = async () => {
    const res = await fetch(`/api/comment/commentlist?boardId=${props.boardId}`);
    const result = await res.json();

    setComment(result.data);
  };

  useEffect(() => {
    listData();
  }, [props.boardId]);

  return (
    <>
      <BoardCommentList data={comment} fetchListData={listData} author={props.author} />
      <BoardCommentNew boardId={props.boardId} fetchListData={listData} />
    </>
  );
}
