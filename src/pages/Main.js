import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Star from "../components/Star";

const Main = () => {

    return (
        <React.Fragment>
            <article>
                <Header/>
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
left:50% ;
transform: translateX(-50%);
width: 100%;
max-width: 780px;
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