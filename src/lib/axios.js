import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "",
  // baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
    //   "authorization" :  `${cookies.get("token")}`
  },
  withCredentials: true,
});

export const apis = {
  //로그인, 회원가입
  loginAX: (loginInfo) => instance.post(`/user/login`, loginInfo),
  loginCheckAX: () => instance.get(`/user/logincheck`),
  signupAX: (signupInfo) => instance.post(`/user/signup`, signupInfo),
  nicknameAX: (nickname) =>
    instance.get(`/user/nickname/check?nickname=${nickname}`),
  usernameAX: (email) => instance.get(`/user/username/check?username=${email}`),

  //스타 페이지
  getStarPhotoAX: () => instance.get(`/star/photo`),
  getLocationListAX: () => instance.get(`/star/location`),
  getNoticeNowAX: (id) => instance.get(`/star/info?locationId=${id}`),
};
