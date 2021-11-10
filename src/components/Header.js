import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";

import ic_logo from "../img/ic_logo.svg";
import ic_user from "../img/header/ic_mypage.svg";

const Header = () => {
  const is_login = useSelector((state) => state.login.is_login);
  const is_textLogo = useSelector((state) => state.header.textLogo);
  const dispatch = useDispatch();
  const navClick = (e) => {
    const name = e.target.getAttribute("name");
    dispatch(textLogo(name === "" || name === "login" ? true : false));
    history.push(`/${name}`);
  };

  return (
    <React.Fragment>
      <StyledHeader>
        <div>
          <StyledLogo name="" onClick={navClick}>
            <img src={ic_logo} alt="logo" name="" />
            {is_textLogo ? <h3 name="">별보러가지않을래?</h3> : null}
          </StyledLogo>
          <StyledNav textlogo={textLogo}>
            <p name="star" onClick={navClick}>
              별자리
            </p>
            <p name="map" onClick={navClick}>
              지도
            </p>
            <p name="community" onClick={navClick}>
              커뮤니티
            </p>
          </StyledNav>
        </div>
        <StyledUser>
          {!is_login ? (
            <p name="login" onClick={navClick}>
              로그인/회원가입
            </p>
          ) : (
            <p name="" onClick={navClick}>
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

const StyledLogo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 48px;
  h3 {
    font-size: 24px;
  }
  img {
    width: 40px;
    height: 40px;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  align-self: center;
  gap: 84px;
  margin-left: ${(props) => (props.textLogo ? "108px" : "51px")};
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
