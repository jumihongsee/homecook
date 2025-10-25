'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from './main.module.scss';

export default function MainPerformance() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main>
      <div className={styles.mainWrapper}>
        <div className={styles.leftImgSec}>
          <img src="/main/main_visual_2.webp" alt="메인-비쥬얼-요리하는이미지" />
        </div>
        <div className={styles.rightContSec}>
          <h1 className={styles.title}>HOME COOK.</h1>
          <p className={styles.desc}>
            <strong>홈쿡에서</strong> 레시피를 공유하고 새로운 요리의 즐거움을 함께 나눠보세요.
            <br />
            작은 정성이 모여 <strong>특별한 한 끼</strong>가 됩니다.
          </p>
          <div className={styles.btnGroup}>
            <button onClick={() => router.push('/board/list')} className={styles.primaryBtn}>
              레시피 보러가기
            </button>

            {!session && (
              <div className={styles.registerBtnWrapper}>
                <p>아직 회원이 아니시라면? </p>
                <button
                  onClick={() => router.push('/user/register')}
                  className={styles.registerBtn}
                >
                  <strong>회원가입하기</strong>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
