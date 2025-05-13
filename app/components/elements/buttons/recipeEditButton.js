'use client';
import { useRouter } from 'next/navigation';
import styles from './button.module.scss';
export default function EditButton(props) {
  const router = useRouter();

  return (
    <button
      className={styles.edit}
      onClick={() => {
        router.push(`/board/detail/${props.boardId}/edit`);
      }}
    >
      레시피 수정
    </button>
  );
}
