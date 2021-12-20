import React from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import {
  ic_align_left,
  ic_align_middle,
  ic_align_right,
  ic_bold,
  // ic_emoticon,
  // ic_file,
  // ic_frame,
  ic_italic,
  ic_picture,
  ic_play,
  ic_underline,
} from "../img/editor";

const CustomToolbar = () => {
  const icons = ReactQuill.Quill.import("ui/icons");
  icons["bold"] = `<img src=${ic_bold} alt="icon" />`;
  icons["italic"] = `<img src=${ic_italic} alt="icon" />`;
  icons["underline"] = `<img src=${ic_underline} alt="icon" />`;
  icons["align"][""] = `<img src=${ic_align_left} alt="icon" />`;
  icons["align"]["center"] = `<img src=${ic_align_middle} alt="icon" />`;
  icons["align"]["right"] = `<img src=${ic_align_right} alt="icon" />`;
  icons["image"] = `<img src=${ic_picture} alt="icon" />`;
  icons["video"] = `<img src=${ic_play} alt="icon" />`;

  return (
    <ToolBox id="toolbar">
      <ButtonBox className="">
        <button className="ql-image" />
        <button className="ql-video" />
        {/* <button className="aaa">
          <img src={ic_file} alt="icon" />
        </button>
        <button className="aaa">
          <img src={ic_frame} alt="icon" />
        </button>
        <button className="aaa">
          <img src={ic_emoticon} alt="icon" />
        </button> */}
      </ButtonBox>
      <ButtonBox className="">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </ButtonBox>
      <ButtonBox className="align">
        <button class="ql-align" value=""></button>
        <button class="ql-align" value="center"></button>
        <button class="ql-align" value="right"></button>
      </ButtonBox>
    </ToolBox>
  );
};

const ToolBox = styled.div`
  display: flex;
  &.ql-toolbar.ql-snow {
    padding: 0;
  }
  &.ql-snow.ql-toolbar button {
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 720px) {
    padding: 0 20px;
  }
`;

const ButtonBox = styled.div`
  width: fit-content;
  height: 48px;
  border-right: 1px solid #666;
  display: flex;
  align-items: center;
  gap: 24px;

  &:nth-child(1) {
    padding: 0 18px 0 14px;
  }
  &:nth-child(2) {
    padding: 0 18px;
  }
  &:nth-child(3) {
    padding: 0 18px;
    border: none;
  }

  @media only screen and (max-width: 720px) {
    gap: 0px;
    width: 100%;

    border: none;
    &:nth-child(1) {
      padding: 0;
      flex: 2;
      justify-content: space-around;
    }
    &:nth-child(2) {
      padding: 0;
      flex: 3;
      justify-content: space-around;
    }
    &:nth-child(3) {
      padding: 0;
      flex: 3;
      justify-content: space-around;
    }
  }
`;

export default CustomToolbar;
