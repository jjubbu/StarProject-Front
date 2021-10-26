import React from "react";
import styled from "styled-components";
import Star from "../components/Star";

const Main = () => {

    return (
        <React.Fragment>
            <article>
                <Navi>
                    <a href="#">별자리</a>
                    <a href="#">지도</a>
                    <a href="#">커뮤니티</a>
                </Navi>
                <Star/>
            </article>
        </React.Fragment>
    )

}

const Navi = styled.section `
position: absolute;
top: 20px;
right: 0;
width: 50%;
display: flex;
justify-content: space-around;
text-decoration: none;
z-index: 100;

a{
    color: white;
    display: block;
    padding: 20px;
    font-weight: 700;
}

a:hover{
    color:plum;
}
`

export default Main;