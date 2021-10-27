import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

const Header = () => {

    const is_login = useSelector(state => state.login.is_login);

    return(
        <React.Fragment>
            <StyledArticle>
            {!is_login?<a href="/login">login</a>:<a href="/">logout</a>}
            </StyledArticle>
        </React.Fragment>
    )
}

const StyledArticle = styled.article`
position: absolute;
z-index: 100;
right: 20px;
top:20px;

a{color:blueviolet;}
`

export default Header;