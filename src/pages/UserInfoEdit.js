import React from "react";
import styled from "styled-components";
import { InputBox, CommonInput } from "../elements";
import _ from "lodash";
import { apis } from "../lib/axios";
import ic_user from "../img/header/ic_mypage.svg";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";

const UserInfoEdit = () => {
  const [userInfo, setUserInfo] = React.useState({
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [warning, setWarning] = React.useState({
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const [inputWarn, setInputWarn] = React.useState({
    nickname: "none",
    password: "none",
    passwordCheck: "none",
  });

  const dispatch = useDispatch();

  const pwCheck =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

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
      console.log("debounce!");
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
        !(value === userInfo.password)
      );
    }, 500),
    [userInfo.password]
  );

  const inputValue = (e) => {
    const { name, value } = e.target;
    console.log("input change!");
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    warnCheck(name, value);
    warnCheckPw2(name, value);
  };

  const editUserInfo = () => {
    if (!userInfo.nickname || !userInfo.password || !userInfo.passwordCheck) {
      const empty = Object.keys(userInfo).find(
        (key) => userInfo[key].length <= 0
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
    console.log("userInfo server go!");
    apis
      .putUserInfoAX(userInfo)
      .then((response) => {
        if (response.status === 200) {
          alert("저장 성공!");
          history.push("/mypage");
        } else {
          alert("저장 실패!");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const overlapAxios = (code, check) => {
    console.log("code?", code);
    if (code === 200) {
      console.log("overlap set!");
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
    if (userInfo[check] === "") {
      setWarning((prevState) => ({
        ...prevState,
        [check]: "값을 입력하고 중복확인 버튼을 눌러주세요!",
      }));
      setInputWarn((prevState) => ({ ...prevState, [check]: "warn" }));
    } else if (check === "nickname" && inputWarn.nickname === "none") {
      apis
        .nicknameAX(userInfo.nickname)
        .then((response) => {
          const code = Number(response.data.code);
          overlapAxios(code, check);
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    dispatch(textLogo(true));
  }, []);
  return (
    <React.Fragment>
      <StyleArticle className="CommonGap">
        <h1>프로필수정</h1>
        <img src={ic_user} alt="user profile" className="userProfile" />
        <InputBox className="userInfoeditBox">
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
            <Warning useable={inputWarn.nickname}>
              {warning.nickname} 00
            </Warning>
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
        </InputBox>
        <EditProfileButton onClick={editUserInfo}>프로필수정</EditProfileButton>
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
  .userProfile {
    display: block;
    width: 120px;
    height: 120px;
    margin: 48px auto 0;
  }

  .userInfoeditBox {
    margin-top: 42px;
    gap: 20px;
  }
`;

const Warning = styled.p`
  ${(props) =>
    props.useable === "warn" && "success" ? "display:block;" : "display:none;"};
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

const EditProfileButton = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 32px;
  background: #4688ec;
  border-radius: 10px;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: white;
  border: none;
  cursor: pointer;
`;

export default UserInfoEdit;
