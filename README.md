# 🥘 HomeCook | Recipe Sharing Platform

![Next.js](https://img.shields.io/badge/-Next.js-black?logo=next.js&style=for-the-badge)
![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge)
![SCSS](https://img.shields.io/badge/-SCSS-FFAACD?logo=sass&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/-MongoDB-8AE58A?logo=mongodb&style=for-the-badge)
![AWS S3](https://img.shields.io/badge/-AWS_S3-FF9900?logo=amazon-aws&style=for-the-badge)
![NextAuth](https://img.shields.io/badge/-NextAuth-000000?logo=auth0&style=for-the-badge)

> 요리를 좋아하는 취미에서 출발해, 직접 요리를 등록·공유할 수 있는 **레시피 플랫폼**을 제작했습니다.
>
> Google 또는 Github 계정으로 간편하게 회원가입할 수 있으며, 자신의 레시피를 등록,수정,삭제할 수 있습니다.
>
> 마음에 드는 레시피에는 좋아요를 눌러 마이페이지에 저장하고, 한눈에 모아볼 수 있습니다.
>
> 검색 기능을통해 원하는 레시피를 빠르게 찾을 수 있고, 댓글을 통해 작성자와 사용자간 자유로운 소통이 가능합니다.

---

## Overview

- **프로젝트명:** HomeCook
- **개발기간:** 6주 소요
- **개발인원:** 1인 (기획 · 디자인 · 퍼블리싱 · 개발 전담)
- **배포 URL:** [https://homecook.vercel.app](https://homecook.vercel.app)

---

## Key Features

- **회원가입 / 로그인 / SNS 로그인( NextAuth.js / Google, Kakao )**
- **레시피 CRUD / 유효성 검사**
- **댓글 / 좋아요 기능**
- **검색 기능**
- **반응형 웹 구현**

---

## Tech

| 구분           | 사용 기술                      |
| -------------- | ------------------------------ |
| **Frontend**   | `Next.js` `React` `SCSS`       |
| **Backend**    | `Next.js API Routes` `MongoDB` |
| **Auth**       | `NextAuth.js`                  |
| **Storage**    | `AWS S3`                       |
| **Deployment** | `Vercel`                       |
| **Design**     | `Figma`                        |

---

## Design

[![Figma](https://img.shields.io/badge/View%20Design-Figma-9A48FF?logo=figma&logoColor=white&style=for-the-badge)](https://www.figma.com/design/QJcZQTvf1ljzcxKdCJKhcV/homecook?t=Lxialfc7Y39r13Zb-0)

- 위 링크로 디자인 시안을 확인하실 수 있습니다.

---

## Folder

```bash
app
├── board                        # 레시피 게시판 UI
│   ├── components               # 레시피 공용 컴포넌트
│   ├── detail                   # 레시피 상세 페이지
│   ├── list                     # 레시피 리스트 페이지
│   └── new                      # 레시피 작성 페이지
│
├── components
│   ├── elements                 # 삭제 / 좋아요 / 수정 버튼 등 공용 요소
│   ├── footer
│   ├── header
│   └── main                     # 메인 페이지
│
├── provider
│   └── authProvider.js          # NextAuth 세션 및 인증 Provider 설정
│
├── util
│   └── time.js                  # 날짜·포맷 관련 유틸
│
├── search                       # 레시피 검색 관련
├── user                         # 마이페이지 (내 댓글, 좋아요한 레시피)
├── layout.js
└── page.js                      # 메인 페이지


pages/api
├── auth                         # 회원가입 / 로그인 관련 API
│   ├── [...nextauth].js         # NextAuth 설정
│   └── signup.js                # 회원가입 처리 (bcrypt 암호화)
│
├── comment                      # 댓글 관련 API
│   ├── commentlist.js           # 댓글 조회
│   ├── commentnew.js            # 댓글 등록
│   ├── commentupdate.js         # 댓글 수정
│   └── delete.js                # 댓글 삭제
│
├── recipe                       # 레시피 CRUD API
│   ├── image.js                 # 이미지 업로드 (S3 연동)
│   ├── delete.js                # 레시피 삭제
│   ├── edit.js                  # 레시피 수정
│   ├── like.js                  # 좋아요 처리
│   ├── list.js                  # 게시글 리스트 조회
│   └── new.js                   # 레시피 등록
│
├── search                       # 검색 API
│   └── keyword.js               # 키워드 검색
│
├── user                         # 유저 관련 API
│   ├── info.js                  # 유저 정보 조회
│   ├── likelist.js              # 좋아요한 레시피 목록
│   └── mypage.js                # 마이페이지
│
└── styles                       # 전역 스타일 및 SCSS
```

## Getting Started

```bash
npm install
npm run dev
```

## Set up .env

#### ✦ MongoDB

> MONGO_URL= MongoDB url

#### ✦ AWS S3

> ACCESS_KEY = AWS S3 액세스 키 ID
>
> SECRET_KEY = AWS S3 비밀 액세스 키
>
> BUCKET_NAME = 이미지 파일이 저장될 S3 버킷 이름

#### ✦ GitHub OAuth (NextAuth Provider)

> GIT_CLIENT_ID = GitHub OAuth 애플리케이션의 클라이언트 ID
>
> GIT_CLIENT_SECRET =GitHub OAuth 애플리케이션의 클라이언트 시크릿 키

#### ✦ Google OAuth (NextAuth Provider)

> GOOGLE_CLIENT_ID = Google OAuth 클라이언트 ID
>
> GOOGLE_CLIENT_SECRET = Google OAuth 클라이언트 시크릿 키

#### ✦ NextAuth

> NEXTAUTH_SECRET = NextAuth용 시크릿 키
>
> NEXTAUTH_URL = NextAuth 기본 URL (개발환경: http://localhost:3000)

---

## License

_Copyright © 2025 Hong Jumi All rights reserved._
