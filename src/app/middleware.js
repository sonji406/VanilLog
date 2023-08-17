export { default } from 'next-auth/middleware';

// login authentication 미들웨어
// https://next-auth.js.org/configuration/nextjs
export const config = { matcher: ['/dashboard'] };

// 로그아웃 구현 0
// mongodb에 데이터 저장
// 화면에서 데이터를 사용할 때마다 가져와서 있으면 몽고디비 데이터를 보여주고 없으면 세션 데이터 보여주게 앞으로 작성
// authentication 되는지 확인 (auth 칸반에서)
