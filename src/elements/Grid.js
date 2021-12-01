import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  };

  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};
Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
};
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  /* padding */
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  /* margin */
    ${(props) => (props.margin ? `padding: ${props.margin};` : "")}
    /* background-color */
    ${(props) => (props.bg ? `background-color: ${props.bg}}` : "")}
    /* is-flex */
    ${(props) =>
    props.is_flex
      ? `display: flex; flex-direction: row; flex-wrap: wrap; flex-flow: row wrap; align-items:center; justify-content: space-between;`
      : ""}
    ${(props) => (props.center ? `text-align:center}` : "")}
`;

export default Grid;
