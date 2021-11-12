import React from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StyledInput } from "../elements/CommonInput";

const AddEditPost = () => {
  const [quillValue, setQuillValue] = React.useState();

  return (
    <React.Fragment>
      <PostWriteBox className="CommonPageStyle">
        <PostInput type="text" placeholder="제목을 입력하세요" />
        <TextEditorBox className="textEditor">
          <ReactQuill
            value={quillValue}
            onChange={(e) => setQuillValue(e)}
          ></ReactQuill>
        </TextEditorBox>
        <div className="buttonBox">
          <PostInput
            type="text"
            name="address"
            placeholder="캠핑한 장소의 주소를 입력하세요"
          />

          <ButtonStyle>저장하기</ButtonStyle>
        </div>
      </PostWriteBox>
    </React.Fragment>
  );
};

const PostWriteBox = styled.div`
  background-color: #303136;
  border-radius: 10px;
  padding: 38px 28px;
  display: flex;
  flex-direction: column;

  .buttonBox {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
`;

const PostInput = styled(StyledInput)`
  background: none;
  border-bottom: 1px solid #666;
  border-radius: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: white;

  &[name="address"] {
    width: 50%;
    padding: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #ccc;
    height: 40px;
  }
`;

const TextEditorBox = styled.div`
  margin-top: 28px;
  flex: 1;
  .quill {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .ql-toolbar {
    border: none;
    background: #666;
  }
  .ql-toolbar * {
    stroke: white;
    color: white;
  }
  .ql-toolbar .ql-picker-label.ql-active .ql-stroke {
    stroke: white;
  }
  .ql-active::before {
    color: white;
  }
  .ql-picker-item::before {
    color: #666;
  }
  .ql-container {
    flex: 1;
    border: 1px solid #666;
  }
`;

const ButtonStyle = styled.button`
  padding: 9px 23px;
  margin-top: 20px;
  background: #18191e;
  color: #ccc;
  border: none;
  border-radius: 4px;

  font-size: 14px;
  line-height: 18px;
`;

export default AddEditPost;
