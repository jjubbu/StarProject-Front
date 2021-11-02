import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import ic_user from "../img/header/ic_mypage.svg";

const Header = () => {
  const is_login = useSelector((state) => state.login.is_login);

  return (
    <React.Fragment>
      <StyledHeader>
        <div>
          <StyledLogo
            onClick={() => {
              history.push("/");
            }}
          >
            별보러가지않을래?
          </StyledLogo>
          <StyledNav>
            <p
              onClick={() => {
                history.push("/star");
              }}
            >
              별자리
            </p>
            <p
              onClick={() => {
                history.push("/map");
              }}
            >
              지도
            </p>
            <p
              onClick={() => {
                history.push("/");
              }}
            >
              커뮤니티
            </p>
          </StyledNav>
        </div>
        <StyledUser>
          {!is_login ? (
            <p
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인/회원가입
            </p>
          ) : (
            <p
              onClick={() => {
                history.push("/logout");
              }}
            >
              로그아웃
            </p>
          )}
          <div className="userIcon">
            <img src={ic_user} alt="user" />
          </div>
        </StyledUser>
      </StyledHeader>
    </React.Fragment>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 100%;
  max-width: 1200px;
  margin: 34px 0 33px;
  & > div {
    display: flex;
  }
`;

const StyledLogo = styled.h3`
  font-size: 24px;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  display: flex;
  align-self: center;
  gap: 84px;
  margin-left: 108px;
  p {
    font-size: 16px;
    cursor: pointer;
  }
`;

const StyledUser = styled.div`
  display: flex;
  align-self: center;
  gap: 40px;

  p {
    font-size: 12px;
    line-height: 24px;
    cursor: pointer;
  }

  .userIcon {
    width: 24px;
    height: 24px;
    background-color: #999db5;
    border-radius: 24px;
    overflow: hidden;
  }
  img {
    margin-top: 1px;
  }
`;

export default Header;
