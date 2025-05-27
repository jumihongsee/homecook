'use client';
import { useState } from 'react';
import styles from '../styles/user.module.scss';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
export default function LoginUI() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailAlert('✔ 이메일을 입력해주세요');
      return;
    }
    if (!password.trim()) {
      setPasswordAlert('✔ 비밀번호를 입력해주세요');
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setErrorMsg('✔ 이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <section className={styles.login}>
      <h1 className={styles.logo}>LOGO</h1>
      <div className={styles.topTitle}>
        <p>로그인 페이지</p> <span className={styles.alert}>{errorMsg}</span>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <span>{emailAlert}</span>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              onChange={e => {
                setEmailAlert('');
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <span>{passwordAlert}</span>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={e => {
                setPasswordAlert('');
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className={styles.originSignUp} type="submit">
            로그인 하기
          </button>
        </form>
      </div>
      <div className={styles.oAuthLogin}>
        <div className={styles.easyLogin}>
          <p>간편하게 로그인해보세요</p>
        </div>
        <button
          className={styles.googleSingIn}
          onClick={() =>
            signIn('google', {
              redirect: true,
              callbackUrl: '/', // 로그인 후 이동할 경로
            })
          }
        >
          <img src="/user/googleIcon.png" alt="구글 아이콘" />
          구글로 바로 로그인
        </button>

        <button
          className={styles.githubSignIn}
          onClick={() =>
            signIn('github', {
              redirect: true,
              callbackUrl: '/',
            })
          }
        >
          <img src="/user/githubIconWhite.png" alt="깃허브 아이콘" />
          깃허브로 바로 로그인
        </button>
      </div>
    </section>
  );
}
