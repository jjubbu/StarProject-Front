import React from "react";
import { apis } from "../lib/axios";
import styled from "styled-components";

const Signup = () => {
  const [signupInfo, setSignupInfo] = React.useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });

  const inputValue = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const signup = () => {
    console.log(signupInfo);
    apis.signupAX(signupInfo).then((response) => {
      console.log(response);
    });
  };
  return (
    <React.Fragment>
      <StyleArticle>
        <h1>회원가입</h1>
        <section>
          <label>
            <h3>닉네임</h3>
            <input name="nickname" onChange={inputValue} />
            <button>닉네임 중복확인</button>
          </label>
          <label>
            <h3>아이디 이메일형식</h3>
            <input name="username" onChange={inputValue} />
            <button>이메일 중복확인</button>
          </label>
          <label>
            <h3>비밀번호</h3>
            <input name="password" onChange={inputValue} />
          </label>
          <label>
            <h3>비밀번호 재확인</h3>
            <input name="passwordCheck" onChange={inputValue} />
          </label>
        </section>
        <button onClick={signup}>회원가입</button>
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
  & > button {
    width: 100%;
    padding: 10px;
  }
`;

export default Signup;
