'use client';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';

export default function Header(props) {
  const router = useRouter();
  const [headerFix, setHeaderFix] = useState(false);

  useEffect(() => {
    function scroll() {
      if (window.scrollY > 25) {
        setHeaderFix(true);
      } else {
        setHeaderFix(false);
      }
    }
    window.addEventListener('scroll', scroll);
  }, []);

  return (
    <header className={`${styles.header} ${headerFix && styles.fixed}`}>
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
            props.userData ? router.push('/board/new') : signIn();
          }}
        >
          레시피 등록
        </li>
      </ul>
      <ul>
        {props.userData ? (
          <div className={styles.logIn}>
            <div className={styles.profile}>
              <img
                src={props.userData.image ? `${props.userData?.image}` : '/user/default_user.svg'}
              />
            </div>
            <button
              onClick={() => {
                signOut();
              }}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <>
            <li
              onClick={() => {
                signIn();
              }}
            >
              로그인
            </li>
            <li
              onClick={() => {
                router.push('/user/register');
              }}
            >
              회원가입
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
