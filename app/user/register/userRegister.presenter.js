'use client';
import { useState } from 'react';
import styles from '../styles/user.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterUI() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameAlert, setNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const innerCharacters = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

  const router = useRouter();

  const handleSubmit = async () => {
    let hasError = false;

    if (!name.trim()) {
      setNameAlert('✔ 이름을 입력해주세요');
      hasError = true;
    } else if (name.trim().length <= 1) {
      setNameAlert('✔ 이름은 두글자 이상 입력해주세요');
      hasError = true;
    }
    if (!email.trim()) {
      setEmailAlert('✔ 이메일을 입력해주세요');
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordAlert('✔ 비밀번호를 입력해주세요');
      hasError = true;
    } else if (!innerCharacters.test(password)) {
      setPasswordAlert('✔ 8자 이상, 영문+숫자+특수문자를 포함해주세요');
      hasError = true;
    }

    if (hasError) return;

    let data = {
      name,
      email,
      password,
    };

    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async r => {
      if (r.ok) {
        const login = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        if (login.ok) {
          router.push('/api/auth/signin');
        }
      } else {
        const err = await r.json();
        setEmailAlert(err.message);
      }
    });
  };

  return (
    <section className={styles.register}>
      <h1 className={styles.logo}>HOME COOK</h1>
      <div className={styles.topTitle}>
        <p>회원가입 페이지</p>
      </div>

      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <span>{nameAlert}</span>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              onChange={e => {
                setNameAlert('');
                setName(e.target.value);
              }}
            />
          </div>
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
            회원 가입하기
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
