'use client';
import { useRouter } from 'next/navigation';
import styles from './button.module.scss';
export default function DeleteButton(props) {
  const router = useRouter();
  // board Id 값 가져와서 진행
  // 이미지 삭제도진행 Src 값을 반환해서 s3 저장소에 있는 값 삭제 /api/recipe/image/delete
  // console.log(props.boardId);
  // console.log(props.imgSrc);

  const handleDelete = async () => {
    //이미지 삭제
    const key = props.imgSrc.split('.com/')[1];
    console.log(key);

    const s3delete = await fetch('/api/recipe/image/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src: key }),
    });
    if (!s3delete.ok) return console.log('이미지 삭제실패');

    //데이터 삭제
    const dataDelete = await fetch('/api/recipe/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId: props.boardId }),
    });
    if (!dataDelete.ok) return console.log('레시피 삭제 실패');

    router.push('/board/list');
  };

  return (
    <>
      <button
        className={styles.delete}
        onClick={() => {
          handleDelete();
        }}
      >
        레시피 삭제
      </button>
    </>
  );
}
