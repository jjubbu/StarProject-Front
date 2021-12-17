import React from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { actionCreators as headerAction } from "../redux/modules/login";

import ic_logo from "../img/ic_logo.svg";
import ic_user from "../img/header/ic_mypage.svg";

const Header = () => {
  const [changeMenu, setChangeMenu] = React.useState("off");
  const [pageName, setPageName] = React.useState("");
  const is_login = useSelector((state) => state.login.is_login);
  const nickname = useSelector((state) => state.login.user_info.nickname);
  const is_textLogo = useSelector((state) => state.header.textLogo);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const navClick = (e) => {
    const name = e.target.getAttribute("name");
    history.push(`/${name}`);
    setChangeMenu("off");
    changePageName();
  };
  const logout = () => {
    cookie.remove("token");
    dispatch(headerAction.isLogin(false));
    history.push("/");
    window.location.reload();
  };

  const menuToggle = () => {
    if (changeMenu === "off") {
      setChangeMenu("on");
    } else {
      setChangeMenu("off");
    }
  };

  const changePageName = () => {
    const path = history.location.pathname;
    setChangeMenu("");
    if (path === "/map") {
      setPageName("지도");
    } else if (path === "/star") {
      setPageName("별자리");
    } else if (path === "/community") {
      setPageName("커뮤니티");
    }
  };

  React.useEffect(() => {
    changePageName();
  }, []);

  return (
    <React.Fragment>
      <StyledMenu name={changeMenu}>
        <div>
          <img src={ic_user} alt="user" />
          {!is_login ? (
            <p name="login" onClick={navClick}>
              로그인/회원가입
            </p>
          ) : (
            <React.Fragment>
              <p name="mypage" onClick={navClick}>
                {nickname}
              </p>
            </React.Fragment>
          )}
        </div>
        <ul>
          <li name="star" onClick={navClick}>
            별자리
          </li>
          <li name="map" onClick={navClick}>
            지도
          </li>
          <li name="community" onClick={navClick}>
            커뮤니티
          </li>
        </ul>
      </StyledMenu>
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
        <h3 className="pageTitle">{pageName}</h3>
        <StyledUser>
          {!is_login ? (
            <p name="login" onClick={navClick}>
              로그인/회원가입
            </p>
          ) : (
            <React.Fragment>
              <p name="mypage" onClick={navClick}>
                마이페이지
              </p>
              <p name="" onClick={logout}>
                로그아웃
              </p>{" "}
            </React.Fragment>
          )}
          <div className="userIcon">
            <img src={ic_user} alt="user" />
          </div>
          <button name={changeMenu} className="menu" onClick={menuToggle}>
            <span />
            <span />
            <span />
          </button>
        </StyledUser>
      </StyledHeader>
    </React.Fragment>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 1200px;
  margin: 34px auto 33px;
  & > div {
    display: flex;
  }
  .pageTitle {
    display: none;
    font-weight: bold;
    font-size: 32px;
    line-height: 48px;
  }
  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 20px;
  }
  @media only screen and (max-width: 720px) {
    .pageTitle {
      display: block;
    }
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
    position: relative;
  }
  p:hover {
    color: #ffce00;
  }
  @media only screen and (max-width: 720px) {
    display: none;
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
    @media only screen and (max-width: 720px) {
      display: none;
    }
  }

  .userIcon {
    width: 24px;
    height: 24px;
    background-color: #999db5;
    border-radius: 24px;
    overflow: hidden;
    @media only screen and (max-width: 720px) {
      display: none;
    }
  }
  img {
    margin-top: 1px;
  }

  .menu {
    display: none;
    @media only screen and (max-width: 72720px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      padding: 0 2px;
      span {
        width: 100%;
        height: 2px;
        background: #fff;
        display: block;
        transition: all 0.2s ease;
      }
      &[name="on"] {
        position: relative;
        z-index: 100;
        span {
          position: absolute;
          top: 50%;
        }
        span:first-child {
          transform: rotate(45deg);
          transition: transform 0.2s ease;
        }
        span:nth-child(2) {
          display: none;
        }
        span:last-child {
          transform: rotate(-45deg);
          transition: transform 0.2s ease;
        }
      }
    }
  }
`;

const StyledMenu = styled.section`
  position: absolute;
  top: 0;
  right: -100%;

  background: #18191e;
  z-index: 100;
  width: 100%;
  height: 100%;
  & > div {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
    padding: 79px 0 20px 32px;
    border-bottom: 1px solid #333;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      cursor: pointer;
      flex: 1;
      padding: 8px;
    }
  }
  ul {
    margin-top: 12px;
    li {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      padding: 20px 0 20px 32px;
      width: 100%;
      cursor: pointer;
      &:hover {
        color: #ffce00;
      }
    }
  }

  &[name="on"] {
    display: block;
    right: 0;
    transition: right 1s ease;
  }
  &[name="off"] {
    transition: right 1s ease;
  }
`;
export default Header;
