import axios from "axios";

export const api = axios.create({
  // 요청을 보낼 주소 설정

  baseURL: "http://3.38.101.209:8080/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});
