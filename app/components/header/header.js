'use client';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';
import { useState, useEffect } from 'react';

export default function Header(props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    if (isActive) {
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = 'auto';
    }

    return () => {
      html.style.overflow = 'auto';
    };
  }, [isActive]);

  return (
    <header className={`${styles.header}`}>
      <div className={styles.logo} onClick={() => router.push('/')} id="logo">
        HOME COOK
      </div>
      <ul className={styles.subList} id="subList">
        <li
          onClick={() => {
            router.refresh();
            router.push('/board/list');
          }}
        >
          전체 레시피
        </li>

        <li
          onClick={() => {
            router.refresh();
            router.push('/search');
          }}
        >
          레시피 검색
        </li>
        <li
          onClick={() => {
            router.refresh();
            props.userData ? router.push('/board/new') : signIn();
          }}
        >
          레시피 등록
        </li>
      </ul>

      <ul className={styles.infoAndSearch}>
        <div
          className={styles.search}
          onClick={() => {
            router.refresh();
            router.push('/search');
          }}
        >
          <img src="/header/search.svg" alt="검색 이미지" />
        </div>
        {props.userData ? (
          <div className={styles.logIn}>
            <div
              className={styles.profile}
              onClick={() => {
                router.refresh();
                props.userData && router.push(`/user/mypage/${props.userData?._id}`);
              }}
            >
              <img
                src={props.userData.image ? `${props.userData?.image}` : '/user/default_user.svg'}
                alt="유저의 프로필 이미지"
              />
            </div>
            <button
              onClick={() => {
                router.refresh();
                signOut();
              }}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <>
            <li
              className={styles.signIn}
              onClick={() => {
                router.refresh();
                signIn();
              }}
            >
              로그인
            </li>
            <li
              onClick={() => {
                router.refresh();
                router.push('/user/register');
              }}
            >
              회원가입
            </li>
          </>
        )}
      </ul>

      <ul className={styles.mobileHeader}>
        <div
          className={styles.search}
          onClick={() => {
            router.refresh();
            setIsActive(false);
            router.push('/search');
          }}
        >
          <img src="/header/search.svg" alt="검색 이미지" />
        </div>
        <div
          className={`${styles.hamNav} ${isActive ? styles.active : ''}`}
          onClick={() => {
            router.refresh();
            setIsActive(prev => !prev);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.fixedMobContainer} ${isActive ? styles.active : ''}`}>
          <div>
            {props.userData ? (
              <>
                <div className={styles.logIn}>
                  <div
                    className={styles.profile}
                    onClick={() => {
                      router.refresh();
                      setIsActive(false);
                      props.userData && router.push(`/user/mypage/${props.userData?._id}`);
                    }}
                  >
                    <img
                      src={
                        props.userData.image ? `${props.userData?.image}` : '/user/default_user.svg'
                      }
                      alt="유저의 프로필 이미지"
                    />
                  </div>
                  <button
                    onClick={() => {
                      router.refresh();
                      setIsActive(false);
                      signOut();
                    }}
                  >
                    LOGOUT
                  </button>
                </div>
              </>
            ) : (
              <>
                <li
                  className={styles.signIn}
                  onClick={() => {
                    router.refresh();
                    setIsActive(false);
                    signIn();
                  }}
                >
                  로그인
                </li>
                <li
                  onClick={() => {
                    router.refresh();
                    setIsActive(false);
                    router.push('/user/register');
                  }}
                >
                  회원가입
                </li>
              </>
            )}
          </div>
          <ul>
            <li
              onClick={() => {
                router.refresh();
                setIsActive(false);
                router.push('/board/list');
              }}
            >
              전체 레시피
            </li>

            <li
              onClick={() => {
                router.refresh();
                setIsActive(false);
                router.push('/search');
              }}
            >
              레시피 검색
            </li>
            <li
              onClick={() => {
                router.refresh();
                setIsActive(false);
                props.userData ? router.push('/board/new') : signIn();
              }}
            >
              레시피 등록
            </li>
          </ul>
        </div>
      </ul>
    </header>
  );
}
