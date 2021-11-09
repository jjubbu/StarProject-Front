import React from "react";
import { apis } from "../lib/axios";
import styled from "styled-components";
import _ from "lodash";

import { CommonInput, InputBox } from "../elements";

import { history } from "../redux/configureStore";

const Signup = () => {
  const [signupInfo, setSignupInfo] = React.useState({
    nickname: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [warning, setWarning] = React.useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });

  const [inputWarn, setInputWarn] = React.useState({
    username: "none",
    password: "none",
    passwordCheck: "none",
    nickname: "none",
  });

  const pwCheck =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  const email =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const setWarningFunc = (name, nameValue, text, test) => {
    if (name === nameValue) {
      setWarning((prevState) => ({
        ...prevState,
        [nameValue]: test ? text : "",
      }));
      setInputWarn((prevState) => ({
        ...prevState,
        [nameValue]: test ? "warn" : "none",
      }));
    }
  };

  const warnCheck = React.useCallback(
    _.debounce((name, value) => {
      setWarningFunc(
        name,
        "username",
        "이메일로 입력해주세요!",
        !email.test(value)
      );
      setWarningFunc(
        name,
        "password",
        "영문,숫자,특수문자를 모두 이용한 최소 8자의 비밀번호를 입력해주세요!",
        !pwCheck.test(value)
      );
      setWarningFunc(
        name,
        "nickname",
        "8자 이하로 입력해주세요!",
        value.length > 8
      );
    }, 500),
    []
  );

  const warnCheckPw2 = React.useCallback(
    _.debounce((name, value) => {
      setWarningFunc(
        name,
        "passwordCheck",
        "비밀번호가 서로 다릅니다.",
        !(value === signupInfo.password)
      );
    }, 500),
    [signupInfo.password]
  );

  const inputValue = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevState) => ({ ...prevState, [name]: value }));
    warnCheck(name, value);
    warnCheckPw2(name, value);
  };

  const signup = () => {
    if (
      !signupInfo.nickname ||
      !signupInfo.username ||
      !signupInfo.password ||
      !signupInfo.passwordCheck
    ) {
      const empty = Object.keys(signupInfo).find(
        (key) => signupInfo[key].length <= 0
      );
      setWarning((prevState) => ({
        ...prevState,
        [empty]: "값을 입력해주세요!",
      }));
      return;
    }
    const warn = Object.keys(inputWarn).find(
      (key) => inputWarn[key] === "warn"
    );
    if (warn !== undefined) {
      return;
    }
    console.log("signupInfo server go!");
    apis
      .signupAX(signupInfo)
      .then((response) => {
        if (response.status === 200) {
          history.push("/login");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const overlapAxios = (code, check) => {
    if (code === 200) {
      setWarning((prevState) => ({
        ...prevState,
        [check]: "사용가능한 아이디입니다.",
      }));
      setInputWarn((prevState) => ({ ...prevState, [check]: "success" }));
    } else if (code === 501) {
      setWarning((prevState) => ({
        ...prevState,
        [check]: "사용할 수 없는 아이디입니다.",
      }));
      setInputWarn((prevState) => ({ ...prevState, [check]: "warn" }));
    }
  };

  const overlapCheck = (e) => {
    const check = e.target.name;
    if (signupInfo[check] === "") {
      setWarning((prevState) => ({
        ...prevState,
        [check]: "값을 입력하고 중복확인 버튼을 눌러주세요!",
      }));
      setInputWarn((prevState) => ({ ...prevState, [check]: "warn" }));
    } else if (check === "nickname" && inputWarn.nickname === "none") {
      apis
        .nicknameAX(signupInfo.nickname)
        .then((response) => {
          const code = Number(response.data.code);
          console.log(check, " check:::", response);
          overlapAxios(code, check);
        })
        .catch((err) => console.log(err));
    } else if (check === "username" && inputWarn.username === "none") {
      apis
        .usernameAX(signupInfo.username)
        .then((response) => {
          const code = Number(response.data.code);
          overlapAxios(code, check);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <StyleArticle>
        <h1>회원가입</h1>
        <InputBoxSignup>
          <label>
            <LabelTitle>닉네임</LabelTitle>
            <WithOverlapBox>
              <CommonInput
                name="nickname"
                onChange={inputValue}
                placeholder="1~8자, 국문/영문 대소문자/숫자 "
                border={inputWarn.nickname}
              />
              <button name="nickname" onClick={overlapCheck} className="roboto">
                중복확인
              </button>
            </WithOverlapBox>
            <Warning useable={inputWarn.nickname}>{warning.nickname}</Warning>
          </label>
          <label>
            <LabelTitle>아이디 이메일형식</LabelTitle>
            <WithOverlapBox>
              <CommonInput
                name="username"
                onChange={inputValue}
                placeholder="이메일 주소"
                border={inputWarn.username}
              />
              <button name="username" onClick={overlapCheck} className="roboto">
                중복확인
              </button>
            </WithOverlapBox>
            <Warning useable={inputWarn.username}>{warning.username}</Warning>
          </label>
          <label>
            <LabelTitle>비밀번호</LabelTitle>
            <CommonInput
              name="password"
              onChange={inputValue}
              placeholder="비밀번호"
              border={inputWarn.password}
            />
            <Warning useable={inputWarn.password}>{warning.password}</Warning>
          </label>
          <label>
            <LabelTitle>비밀번호 재확인</LabelTitle>
            <CommonInput
              name="passwordCheck"
              onChange={inputValue}
              placeholder="비밀번호 확인"
              border={inputWarn.passwordCheck}
            />
            <Warning useable={inputWarn.passwordCheck}>
              {warning.passwordCheck}
            </Warning>
          </label>
        </InputBoxSignup>
        <SignupButton onClick={signup}>회원가입</SignupButton>
      </StyleArticle>
    </React.Fragment>
  );
};

const StyleArticle = styled.article`
  margin: 56px auto 0;
  width: 432px;
  height: 100%;

  h1 {
    text-align: center;
    margin: 0;
  }
`;

const InputBoxSignup = styled(InputBox)`
  gap: 20px;
`;

const Warning = styled.p`
  margin: 12px 0 0 20px;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;

  color: ${(props) => (props.useable === "warn" ? "#ce3030" : "#17AD26")};
`;

const LabelTitle = styled.h3`
  height: 18px;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #eeeeee;
  margin-bottom: 12px;
`;

const WithOverlapBox = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;

  button {
    width: 102px;
    height: 60px;
    background: #666666;
    border-radius: 10px;
    border: none;
    color: #fff;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }
`;

const SignupButton = styled.button`
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
export default Signup;
