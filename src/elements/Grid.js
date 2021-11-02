import React from "react";
import styled from "styled-components";


const Grid = (props)=>{

// 상위 컴포넌트로부터 Props전달받기 
    const {is_flex, width, margin, padding, bg, children, center} = props;


    // 전달받은 props를 별도의 변수에 저장 
    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg, 
        center:center,
    };

    return (
        <React.Fragment>
            {/* 위에서 선언한 styles를 {...styles}로 적용해줍니다 */}
            {/* props로 가져온 값들은 따로 아래와 같이 inline으로 먹여줘야함 */}
            <GridBox {...styles}>
                {children}
                {/*{children}또는 props.children을 미리 넣어줘야한다. 안그러면 이 안에 다른 
                컴포넌트 넣었을 때 안보임 */}
            </GridBox>

        </React.Fragment>

    );
};

// Grid의 default Props
// 부여할 것이라고 예상되는 스타일들에 대해 미리 값을 부여해놓는다 
Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
    center: false,
}


// styled components
const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    /* padding */
    ${(props) => (props.padding ? `padding: ${props.padding};`:"")}
    /* margin */
    ${(props) => (props.margin? `padding: ${props.margin};`:"")}
    /* background-color */
    ${(props)=> (props.bg? `background-color: ${props.bg}}`:"" )}
    /* is-flex */
    ${(props) => props.is_flex
        ? `display: flex; flex-direction: row; flex-wrap: wrap; flex-flow: row wrap; align-items:center; justify-content: space-between;`
        :""}
    ${(props)=> (props.center? `text-align:center}`:"" )}
`;


export default Grid; 