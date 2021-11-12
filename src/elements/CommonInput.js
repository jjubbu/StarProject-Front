import React from "react";
import styled from "styled-components";

const CommonInput = (props) => {
  const { onChange, name, placeholder, value, border, background, type } =
    props;
  return (
    <StyledInput
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      value={value}
      border={border}
      background={background}
      type={type}
    />
  );
};

CommonInput.defaultProps = {
  border: "none",
  background: "#303136",
  type: "text",
};

export const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  background: ${(props) => props.background};
  border-radius: 10px;
  border: none;
  padding: 0 24px;
  font-size: 16px;
  line-height: 20px;
  color: #cccccc;
  border: ${(props) =>
    props.border === "warn"
      ? " 1px solid #CE3030;"
      : props.border === "success"
      ? "1px solid #17AD26;"
      : "none"};
  box-sizing: border-box;
  &::placeholder {
    font-size: 16px;
    line-height: 20px;
    color: #cccccc;
  }
  &:focus {
    outline: none;
  }
`;
export default CommonInput;
