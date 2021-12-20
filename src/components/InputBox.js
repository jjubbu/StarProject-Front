import React from "react";
import styled from "styled-components";

const InputBox = (props) => {
  const { children, className } = props;
  return <StyledDiv className={className}>{children}</StyledDiv>;
};

InputBox.defaultProps = {};

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  @media only screen and (max-width: 480px) {
    margin-top: 50px;
  }
`;
export default InputBox;
