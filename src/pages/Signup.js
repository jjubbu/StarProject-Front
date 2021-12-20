import React from "react";
import styled from "styled-components";
import _ from "lodash";

import { apis } from "../lib/axios";
import { CommonInput, InputBox } from "../elements";
import ic_goBack from "../img/ic_goBack.svg";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { textLogo } from "../redux/modules/header";
import HelmetComp from "../components/HelmetComp";

const Signup = () => {
  const [signupInfo, setSignupInfo] = React.useState({
    username: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [warning, setWarning] = React.useState({
    username: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [inputWarn, setInputWarn] = React.useState({
    username: "none",
    nickname: "none",
    password: "none",
    passwordCheck: "none",
  });

  const [overlapClick, setOvelapClick] = React.useState({
    nickname: false,
    username: false,
  });

  const dispatch = useDispatch();

  const pwCheck =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  const email =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const setWarningFunc = (name, nameValue, text, test) => {
    if (name === nameValue) {
      if (name === "nickname" || name === "username") {
        setOvelapClick((prev) => ({ ...prev, [name]: false }));
        setInputWarn((prevState) => ({
          ...prevState,
          [nameValue]: test ? "warn" : "none",
        }));
      } else {
        setInputWarn((prevState) => ({
          ...prevState,
          [nameValue]: test ? "warn" : "success",
        }));
      }

      setWarning((prevState) => ({
        ...prevState,
        [nameValue]: test ? text : "",
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
    const warn = Object.keys(inputWarn).find(
      (key) => inputWarn[key] === "warn"
    );
    if (
      !signupInfo.nickname ||
      !signupInfo.username ||
      !signupInfo.password ||
      !signupInfo.passwordCheck
    ) {
      const empty = Object.keys(signupInfo).find(
        (key) => signupInfo[key].length <= 0
      );
      setInputWarn((prevState) => ({
        ...prevState,
        [empty]: "warn",
      }));
      setWarning((prevState) => ({
        ...prevState,
        [empty]: "값을 입력해주세요!",
      }));
    } else if (!overlapClick.nickname || !overlapClick.username) {
      const needCheck = Object.keys(overlapClick).find(
        (key) => overlapClick[key] === false
      );
      setInputWarn((prevState) => ({
        ...prevState,
        [needCheck]: "warn",
      }));
      setWarning((prevState) => ({
        ...prevState,
        [needCheck]: "중복확인을 해주세요!",
      }));
    } else if (warn !== undefined) {
    } else {
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
    }
  };

  const overlapAxios = (code, check) => {
    if (code === 200) {
      setWarning((prevState) => ({
        ...prevState,
        [check]: String(
          "사용가능한 " +
            (check === "nickname" ? "닉네임" : "아이디") +
            "입니다."
        ),
      }));
      setInputWarn((prevState) => ({ ...prevState, [check]: "success" }));
    } else if (code === 501) {
      setWarning((prevState) => ({
        ...prevState,
        [check]: String(
          "사용할 수 없는 " +
            (check === "nickname" ? "닉네임" : "아이디") +
            "입니다."
        ),
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
    } else if (check === "nickname") {
      apis
        .nicknameAX(signupInfo.nickname)
        .then((response) => {
          const code = Number(response.data.code);
          overlapAxios(code, check);
          setOvelapClick((prev) => ({ ...prev, nickname: true }));
        })
        .catch((err) => alert(err));
    } else if (check === "username") {
      apis
        .usernameAX(signupInfo.username)
        .then((response) => {
          const code = Number(response.data.code);
          overlapAxios(code, check);
          setOvelapClick((prev) => ({ ...prev, username: true }));
        })
        .catch((err) => alert(err));
    }
  };

  const enterKeyEvent = () => {
    if (window.event.keyCode === 13) {
      signup();
    }
  };

  React.useEffect(() => {
    dispatch(textLogo(true));
  }, []);

  return (
    <React.Fragment>
      <HelmetComp title="회원가입" url="https://stellakorea.co.kr/signup" />
      <StyleArticle className="CommonGap">
        <h1>
          <button
            onClick={() => {
              history.push("/login");
            }}
          >
            <img src={ic_goBack} alt="로그인으로 돌아가기" />
          </button>
          회원가입
        </h1>
        <InputBoxSignup>
          <label>
            <LabelTitle>아이디</LabelTitle>
            <WithOverlapBox>
              <CommonInput
                name="username"
                onChange={inputValue}
                placeholder="이메일 주소"
                border={inputWarn.username}
                onKeyPress={enterKeyEvent}
              />
              <button name="username" onClick={overlapCheck} className="roboto">
                중복확인
              </button>
            </WithOverlapBox>
            <Warning useable={inputWarn.username}>{warning.username}</Warning>
          </label>
          <label>
            <LabelTitle>닉네임</LabelTitle>
            <WithOverlapBox>
              <CommonInput
                name="nickname"
                onChange={inputValue}
                placeholder="1~8자"
                border={inputWarn.nickname}
                onKeyPress={enterKeyEvent}
              />
              <button name="nickname" onClick={overlapCheck} className="roboto">
                중복확인
              </button>
            </WithOverlapBox>
            <Warning useable={inputWarn.nickname}>{warning.nickname}</Warning>
          </label>
          <label>
            <LabelTitle>비밀번호</LabelTitle>
            <CommonInput
              name="password"
              onChange={inputValue}
              placeholder="영문,숫자,특수문자가 포함된 1~8자"
              border={inputWarn.password}
              type="password"
              onKeyPress={enterKeyEvent}
            />
            <Warning useable={inputWarn.password}>{warning.password}</Warning>
          </label>
          <label>
            <LabelTitle>비밀번호 재확인</LabelTitle>
            <CommonInput
              name="passwordCheck"
              onChange={inputValue}
              placeholder="영문,숫자,특수문자가 포함된 1~8자"
              border={inputWarn.passwordCheck}
              type="password"
              onKeyPress={enterKeyEvent}
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

  h1 {
    text-align: center;
    margin: 0;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 0 20px 20px;

    margin: 0;
    flex: 1;
    h1 {
      position: relative;
      width: 100vw;
      transform: translateX(-20px);
      font-size: 14px;
      line-height: 20px;
      font-weight: normal;
      padding-bottom: 16px;
      border-bottom: 1px solid #333;
      button {
        position: absolute;
        left: 20px;
        top: -50%;
        transform: translateY(50%);
        border: none;
        background: none;
      }
    }
  }
`;

const InputBoxSignup = styled(InputBox)`
  gap: 20px;
  @media only screen and (max-width: 480px) {
    gap: 24px;
  }
`;

const Warning = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  ${(props) => (props.useable === "warn" ? "margin: 12px 0 0 20px;" : null)};
  color: ${(props) => (props.useable === "warn" ? "#ce3030" : "#17AD26")};
`;

const LabelTitle = styled.h3`
  height: 18px;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #eeeeee;
  margin-bottom: 12px;
  @media only screen and (max-width: 480px) {
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 15px;
    height: auto;
  }
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
    @media only screen and (max-width: 480px) {
      font-size: 14px;
      line-height: 20px;
      height: 40px;
    }
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
  &:hover {
    transform: scale(1.01);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.65);
    transition: all 0.5s;
  }
  @media only screen and (max-width: 480px) {
    height: 40px;
    font-size: 14px;
    line-height: 20px;
  }
`;
export default Signup;
