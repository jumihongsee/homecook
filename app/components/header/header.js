'use client';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';

export default function Header(props) {
  const router = useRouter();

  return (
    <header className={`${styles.header}`}>
      <div className={styles.logo} onClick={() => router.push('/')} id="logo">
        HOME COOK
      </div>
      <ul className={styles.subList} id="subList">
        <li
          onClick={() => {
            router.push('/board/list');
          }}
        >
          전체 레시피
        </li>

        <li
          onClick={() => {
            router.push('/search');
          }}
        >
          레시피 검색
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

      <ul className={styles.infoAndSearch}>
        <div
          className={styles.search}
          onClick={() => {
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
                props.userData && router.push(`/user/mypage/${props.userData?._id}`);
              }}
            >
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
              className={styles.signIn}
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
