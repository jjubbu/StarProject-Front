import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: "http://3.38.101.209:8080/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export const apis = {
  //로그인
  loginAX: (loginInfo) => instance.post(`/user/login`, loginInfo),
  //로그인 체크
  loginCheckAX: () => instance.get(`/user/logincheck`),
  //회원가입
  signupAX: (signupInfo) => instance.post(`/user/signup`, signupInfo),
  //닉네임 중복 확인
  nicknameAX: (nickname) =>
    instance.get(`/user/nickname/check?nickname=${nickname}`),
  //이메일중복확인
  usernameAX: (email) => instance.get(`/user/username/check?username=${email}`),

  //별자리 페이지
  //별자리 사진+내용
  getStarPhotoAX: () => instance.get(`/star/photo`),
  //안내사항 (월출,월일,별관측지수)
  getNoticeAX: (lat, lon) =>
    instance.get(`/star/info?latitude=${lat}&longitude=${lon}`),
  //안내사항 (날씨관련)
  getNoticeWeatherAX: (lat, lon, time) =>
    instance.get(
      `/star/info/time?latitude=${lat}&longitude=${lon}&time=${time}`
    ),
  //실시간 별보기 좋은 지역
  getStarHotAX: () => instance.get("/star/hot"),
};
