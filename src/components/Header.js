import React from "react";
import styled from "styled-components";

import {useSelector} from "react-redux";

import ic_user from "../img/header/ic_mypage.svg";

const Header = () => {

    const is_login = useSelector(state => state.login.is_login);

    return (
        <React.Fragment>
            <StyledHeader>
                <div>
                    <StyledLogo>별보러가지않을래?</StyledLogo>
                    <StyledNav>
                        <a href="/">별자리</a>
                        <a href="#">지도</a>
                        <a href="#">커뮤니티</a>
                    </StyledNav>
                </div>
                <StyledUser>
                    {
                        !is_login
                            ? <a href="/login">로그인/회원가입</a>
                            : <a href="/">로그아웃</a>
                    }
                    <div className="userIcon">
                    <img src={ic_user} alt="user"/>
                    </div>
                </StyledUser>
            </StyledHeader>
        </React.Fragment>
    )
}

const StyledHeader = styled.header `
display: flex;
justify-content: space-between;
align-self: center;
width: 100%;
margin: 34px 0 33px;
    &>div{display:flex;}
`

const StyledLogo = styled.h3 `
font-size: 24px;
`

const StyledNav = styled.nav `
display: flex;
align-self: center;
gap:84px;
margin-left: 108px;
    a{font-size:16px;}  
`

const StyledUser = styled.div `
display: flex;
align-self: center;
gap:40px;

    a{
        font-size:12px;
        line-height: 24px;
    }

    .userIcon{
        width: 24px;
        height: 24px;
        background-color: #999DB5;
        border-radius: 24px;
        overflow: hidden;
    }
    img{
     margin-top   : 1px;
    }

`

export default Header;