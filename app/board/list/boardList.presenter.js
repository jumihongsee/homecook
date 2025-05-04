'use client';
import { useRouter } from 'next/navigation';
import styles from './boardList.module.scss';

export default function BoardUI(props) {
  const data = JSON.parse(props.data);
  const router = useRouter();

  return (
    <>
      <section className={styles.boardList}>
        <section>
          <h2>00개의 전체 레시피</h2>
        </section>
        <section>
          {data.map((item, index) => (
            <aside
              key={index}
              onClick={() => {
                router.push(`/board/detail/${item._id}`);
              }}
            >
              <img />
              <h3>{item?.title}</h3>
              <p>{item?.author}</p>
              <p>등록일</p>
              <p>
                좋아요<span>00</span>{' '}
              </p>
            </aside>
          ))}
        </section>
      </section>
    </>
  );
}
