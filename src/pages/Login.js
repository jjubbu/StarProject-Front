import React from "react";
import { apis } from "../lib/axios";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { CommonInput, InputBox } from "../elements";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as lodinAction } from "../redux/modules/login";
import { textLogo } from "../redux/modules/header";

const Login = () => {
  const dispatch = useDispatch();
  const [is_save, setIsSave] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  const inputValue = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveID = (e) => {
    if (e.target.checked) {
      setIsSave(true);
    } else {
      setIsSave(false);
    }
  };

  const login = () => {
    const cookie = new Cookies();

    if (loginInfo.password === "" || loginInfo.username === "") {
      alert("값을 입력해주세요!");
      return;
    }
    apis.loginAX(loginInfo).then((response) => {
      console.log(response);
      if (response.data.code === 200) {
        const token = response.data.data.token;
        cookie.set("token", token);
        if (is_save) {
          cookie.set("starCampID", loginInfo.username);
        } else {
          cookie.remove("starCampID");
        }
        dispatch(lodinAction.isLogin(true));
        window.location.replace("/");
      } else if (response.data.code === 500) {
        alert(response.data.msg);
      }
    });
  };

  React.useEffect(() => {
    dispatch(textLogo(true));
    const cookie = new Cookies();
    const userIdCookie = cookie.get("starCampID");
    if (userIdCookie !== "") {
      setLoginInfo((prevState) => ({ ...prevState, username: userIdCookie }));
      setIsSave(true);
    } else {
      setIsSave(false);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="CommonPageStyle CommonGap">
        <StyleArticle>
          <h3>로그인</h3>
          <InputBox>
            <label>
              <CommonInput
                name="username"
                onChange={inputValue}
                placeholder="아이디"
                value={loginInfo.username}
              />
            </label>
            <label>
              <CommonInput
                name="password"
                onChange={inputValue}
                placeholder="비밀번호"
                type="password"
              />
            </label>
            <CheckBox>
              <input type="checkbox" onChange={saveID} checked={is_save} />
              <p>아이디 저장</p>
            </CheckBox>
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

const CheckBox = styled.label`
  display: flex;
  gap: 6px;
  align-items: center;
  input {
    width: 18px;
    height: 18px;
    background: #18191e;
    border: 1px solid #666666;
    box-sizing: border-box;
    border-radius: 4px;
  }
  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #eeeeee;
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
