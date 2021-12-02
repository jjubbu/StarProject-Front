# ⭐️ 별 보러 가지 않을래?

🔗 [사이트 보러가기](https://stellakorea.co.kr/)

🔗 [발표영상](https://www.youtube.com/watch?v=mB3gAzsY8s4)

항해 99 3기 실전 프로젝트 "별 보러 가지 않을래?" 의 프론트엔드 원격 저장소

## 👥 팀원

- Front
  - 심선아 [Github](https://github.com/jjubbu)
  - 이지연 [Github](https://github.com/Winoop)
  - 홍유미 [Github](https://github.com/yumiiihong)
- Back
  - 김가민 [Github](https://github.com/7rizL)
  - 박기남 [Github](https://github.com/salmon2)
  - 박시준 [Github](https://github.com/startdata)

## ⚒ 개발기간

- 2021/10/23 ~ 2021/12/02

## 👀 View

<img width="1408" alt="스크린샷 2021-12-03 오전 12 53 34" src="https://user-images.githubusercontent.com/58936251/144456298-1aaef990-c119-4e3c-b43d-2232b8e4a9c5.png">
<img width="1408" alt="00_2_signup" src="https://user-images.githubusercontent.com/58936251/144454953-2ffd4c86-ff1d-4b42-b62f-ff2f966b9b66.png">
<img width="1408" alt="00_2_signup" src="https://user-images.githubusercontent.com/58936251/144455923-eab6a506-6e41-431b-a00e-9c7b53a5ba1d.png">
<img width="1408" alt="02_star" src="https://user-images.githubusercontent.com/58936251/144454982-6e297317-2aa3-4b4f-99d4-1cff2b07cb58.png">
<img width="1408" alt="03_map" src="https://user-images.githubusercontent.com/58936251/144454987-fdc7f17d-6b62-4f9f-8dc5-afbb5f572e52.png">
<img width="1408" alt="04_commu" src="https://user-images.githubusercontent.com/58936251/144454989-729359f1-a30c-4376-92e8-ffeb6e5460c0.png">
<img width="1408" alt="05_post" src="https://user-images.githubusercontent.com/58936251/144454997-c2cb9fb4-9c42-4e18-80fa-02c757945073.png">
<img width="1408" alt="06_my" src="https://user-images.githubusercontent.com/58936251/144454999-00eaa400-00cf-4388-ac67-fb5971eafc29.png">

## ❗️주요기능

- [메인](https://stellakorea.co.kr/)
  - 별자리 보기 좋은곳 추천
- [별자리 페이지](https://stellakorea.co.kr/star)
  - 유저의 위치에 기반한 날씨정보 제공
  - 매일 변하는 실시간 별보기 좋은 지역 정보 제공
- [지도 페이지](https://stellakorea.co.kr/map)
  - 지도 및 캠핑장 위치 마커 표시
  - 유저의 위치 주변 캠핑장 정보 제공
  - 무한 스크롤을 통한 랜더링 시간 단축
  - 지역별 검색기능
- [커뮤니티 페이지](https://stellakorea.co.kr/community)
  - 추천순, 인기순, 최신순 게시글 리스트 출력
  - 게시글 작성
  - 게시글 제목 혹은 지역명을 이용한 검색 기능
  - 좋아요, 북마크 기능 (북마크는 마이페이지에서 확인 가능)
- [로그인/회원가입](https://stellakorea.co.kr/login)
  - 아이디 저장 기능
  - 회원가입 시 닉네임, 아이디 중복확인

## 🔌 기술 스택

- ✏️ javascript, react
- 📝 axios, redux, immer
- 📒 kakao map API, geolocation API
- 📤 S3, Route53, CloudFront => HTTPS

## 📖 주요 라이브러리

- axios : 서버 연결
- react-cookie : 사용자 로그인 인증용도
- react-redux : 클라이언트 데이터 저장
- immer : redux state 불변성 유지
- react-helmet : 메타태그 변경
- react-slick : 많은 데이터를 슬라이더 형식으로 보여줌.
- react-kakao-maps-sdk : 카카오맵API, 지도 및 마커 제공
- lodash : input 이벤트 콜백 감소
- react-quill : 텍스트 편집기 기능 제공

## 🗣 사용자 피드백 및 개선된 점

- 추천 장소에 대한 정보가 부족 => 내용 추가
- 별자리 설명 클릭시 컨텐츠 고정 토글
- 관측지수 0일때 데이터가 들어오는게 맞는지 헷갈림 : 별 관측지수에 따라 문구 변경 "ex) 별 보기 어려운 날 :( "
- 사용자 위치를 페이지 이동할때마다 가져와서 너무 느리게 느껴짐 : 사용자 위치 정보를 리덕스에 저장하여 재활용

## 📌 개선 예정

- 모바일 반응형 스타일 작업
