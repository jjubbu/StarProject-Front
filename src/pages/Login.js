import React from "react";
import { apis } from "../lib/axios";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { isLogin } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
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
    if (loginInfo.password === "" || loginInfo.username === "") {
      alert("값을 입력해주세요!");
      return;
    }
    apis.loginAX(loginInfo).then((response) => {
      console.log(response);
      if (response.data.code === 200) {
        const token = response.data.data.token;
        const cookie = new Cookies();
        cookie.set("token", token);
        dispatch(isLogin(true));
        alert("로그인 성공!");
        history.push("/");
      }
    });
  };

  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <StyleArticle>
          <h3>로그인</h3>
          <InputBox>
            <label>
              <input
                name="username"
                onChange={inputValue}
                placeholder="아이디"
              />
            </label>
            <label>
              <input
                name="password"
                onChange={inputValue}
                placeholder="비밀번호"
              />
            </label>
          </InputBox>
          <LoginButton onClick={login}>로그인</LoginButton>
          <EtcButtonBox>
            <p
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </p>
          </EtcButtonBox>
        </StyleArticle>
      </div>
    </React.Fragment>
  );
};

const StyleArticle = styled.article`
  margin: 120px auto 0;
  max-width: 432px;
  width: 36%;
  height: 100%;

  h3 {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
  }
`;

const InputBox = styled.div`
  display: block;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  input {
    width: 100%;
    height: 60px;
    background: #303136;
    border-radius: 10px;
    border: none;
    padding: 0 24px;
    font-size: 16px;
    line-height: 20px;
    color: #cccccc;

    &::placeholder {
      font-size: 16px;
      line-height: 20px;
      color: #cccccc;
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 30px;
  background: #4688ec;
  border-radius: 10px;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: white;
  border: none;
  cursor: pointer;
`;

const EtcButtonBox = styled.div`
  margin-top: 20px;
  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #eeeeee;
    cursor: pointer;
  }
`;

export default Login;
