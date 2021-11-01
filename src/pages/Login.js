import React from "react";
import { apis } from "../lib/axios";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { history } from "../redux/configureStore";

const Login = () => {
  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  const inputValue = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const login = () => {
    console.log(loginInfo);
    apis.loginAX(loginInfo).then((response) => {
      console.log(response);
      // if(response.data.code === 200){
      //     alert('로그인 성공!');

      // }
    });
  };

  return (
    <React.Fragment>
      <StyleArticle>
        <h1>로그인</h1>
        <section>
          <label>
            <h3>아이디</h3>
            <input name="username" onChange={inputValue} />
          </label>
          <label>
            <h3>비밀번호</h3>
            <input name="password" onChange={inputValue} />
          </label>
        </section>
        <button onClick={login}>로그인</button>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </button>
      </StyleArticle>
    </React.Fragment>
  );
};

const StyleArticle = styled.article`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  height: 100%;
  max-width: 780px;
  gap: 10px;

  justify-content: center;
  align-items: center;
  section {
    width: 100%;
    label {
      display: block;
      width: 100%;
      margin: 20px 0;
      input {
        width: 100%;
      }
    }
  }
  button {
    width: 100%;
    padding: 10px;
  }
`;

export default Login;
