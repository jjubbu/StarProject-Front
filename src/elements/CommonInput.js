import React from "react";
import styled from "styled-components";

const CommonInput = (props) => {
  const { onChange, name, placeholder, value } = props;
  return (
    <StyledInput
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      value={value}
    />
  );
};

CommonInput.defaultProps = {};

const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  background: #303136;
  border-radius: 10px;
  border: none;
  padding: 0 24px;
  font-size: 16px;
  line-height: 20px;
  color: #cccccc;

  &::placeholder {
    font-size: 16px;
    line-height: 20px;
    color: #cccccc;
  }
`;
export default CommonInput;
