'use client';
import styles from './mypage.module.scss';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MyRecipeList from './components/myrecipeList';
export default function MypageUI() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId;
  const [activeTab, setActiveTab] = useState('written');
  const [userInfo, setUserInfo] = useState([]);
  const [myRecipe, setMyRecipe] = useState([]);

  // api > user 정보 조회 + 유저가 쓴 글들 페이지 진입시 데이터 받아오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch('/api/user/info', {
        method: 'POST',
        body: userId,
      });
      if (!res.ok) {
        // 현재 로그인한 사용자의 마이페이지가 아닌경우
        const err = await res.json();
        alert(err.message);
        router.push('/');
        return;
      }

      // 유저 기본정보 데이터
      const data = await res.json();
      setUserInfo(data.userInfoData);

      // '내 레시피' 데이터 조회
      const detailData = await fetch(
        `/api/user/mypage?status=written&userEmail=${data.userInfoData.email}`
      );

      const detailJson = await detailData.json();

      const recipeData = detailJson.data;
      setMyRecipe(recipeData);
    };
    fetchUserInfo();
  }, []);

  // console.log(userInfo);
  // console.log(myRecipe);

  // status 상태에 따라 받아오는 데이터가 달라야함.
  // 1. written => recipe 컬렉션에서 유저가 쓴 글 조회
  // 2. comments =>  comments 컬렉션에서 유저가 쓴 댓글 조회
  // 3. likes => users 컬렉션에서 좋아요 한 레시피 조회

  return (
    <section className={styles.mypageWrapper}>
      <div className={styles.leftMyinfoFixed}>
        <div>
          <div className={styles.imgBox}>
            <img
              src={userInfo?.image ? `${userInfo?.image}` : '/user/default_user.svg'}
              alt="유저의 프로필 이미지"
            />
          </div>

          <h2>{userInfo?.name}</h2>
          <p>{userInfo?.email}</p>
          <div className={styles.buttons}>
            <button>정보 수정</button>
            <button>로그아웃</button>
          </div>
        </div>
      </div>
      <div className={styles.rightContents}>
        <div className={styles.tabButtons}>
          <button
            className={activeTab === 'written' ? styles.active : ''}
            onClick={() => {
              setActiveTab('written');
            }}
          >
            <img src="/user/mypageWrite.svg" alt="마이페이지 레시피 목록 픽토그램" /> 내 레시피
          </button>
          <button
            className={activeTab === 'comments' ? styles.active : ''}
            onClick={() => {
              setActiveTab('comments');
            }}
          >
            <img src="/user/mypageComment.svg" alt="마이페이지 댓글 픽토그램" /> 내 댓글
          </button>
          <button
            className={activeTab === 'likes' ? styles.active : ''}
            onClick={() => {
              setActiveTab('likes');
            }}
          >
            <img src="/user/mypageHeart.svg" alt="마이페이지 좋아요하트 픽토그램" />
            좋아요 한 레시피
          </button>
        </div>
        <div className={styles.contents}>
          <p>전체 ({myRecipe?.length}) 개의 레시피</p>
          <div className={styles.contentsWrapper}>
            <MyRecipeList data={myRecipe} />
          </div>
        </div>
      </div>
    </section>
  );
}
