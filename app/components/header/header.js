'use client';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        로고
      </div>
      <ul>
        <li
          onClick={() => {
            router.push('/board/list');
          }}
        >
          전체 레시피
        </li>
        <li>인기 레시피</li>
        <li
          onClick={() => {
            router.push('/board/new');
          }}
        >
          레시피 등록
        </li>
      </ul>
      <ul>
        <li>로그인</li>
        <li>회원가입</li>
      </ul>
    </header>
  );
}
