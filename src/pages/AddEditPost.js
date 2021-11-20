import React, { useMemo } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { StyledInput } from "../elements/CommonInput";
import ic_save from "../img/ic_save.svg";
import CustomToolbar from "../components/QuillCustomToolbar";

const AddEditPost = () => {
  const [quillValue, setQuillValue] = React.useState();
  const [quillImage, setQuillImage] = React.useState();
  const imageInputREF = React.useRef();
  const QuillREF = React.useRef();

  const imageInputClick = (e) => {
    const reader = new FileReader();
    const file = imageInputREF.current.files[0];

    //파일을 읽어온다!
    reader.readAsDataURL(file);
    //파일 읽은 후 실행할 행동!
    reader.onloadend = () => {
      // const range = quill.getSelection();
      const quill = QuillREF.current.getEditor();
      const range = quill.getSelection()?.index;
      console.log(reader.result);
      console.log("range:::", range);
      console.log("origin File name :::", file.name);

      quill.insertEmbed(range, "image", reader.result);
    };
  };
  const imageHandler = () => {
    document.getElementById("imgInput").click();
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "align",
  ];

  return (
    <React.Fragment>
      <AddEditStyled className="CommonPageStyle CommonGap">
        <AddEditHeader>
          <h3>커뮤니티 게시글 작성</h3>
          <button>
            업로드 <img src={ic_save} alt="save" />
          </button>
        </AddEditHeader>
        <PostWriteBox>
          <PostInput
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
          />
          <TextEditorBox className="textEditor">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={imageInputREF}
              id="imgInput"
              onChange={imageInputClick}
            />

            <CustomToolbar />
            <ReactQuill
              value={quillValue}
              onChange={(e) => setQuillValue(e)}
              modules={modules}
              formats={formats}
              ref={QuillREF}
            />
            <PostInput
              type="text"
              name="address"
              placeholder="캠핑한 장소의 주소를 입력하세요"
            />
          </TextEditorBox>

          <PostInput
            type="text"
            name="tag"
            placeholder="# 해시태그를 입력해주세요"
            className="openSans"
          />
        </PostWriteBox>
      </AddEditStyled>
    </React.Fragment>
  );
};

const AddEditStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 42px;
`;

const AddEditHeader = styled.header`
  margin: 0 auto;
  width: 100%;
  position: relative;
  text-align: center;

  h3 {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
  }

  button {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 6px;
    right: 0;
    top: 0;
    height: 40px;
    padding: 0 16px 0 21px;
    background: #4688ec;
    border-radius: 4px;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
`;

const PostWriteBox = styled.main`
  background-color: #303136;
  border-radius: 10px;
  padding: 38px 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostInput = styled(StyledInput)`
  background: none;
  border-radius: 0;
  color: #eee;
  &::placeholder {
    color: #eee;
  }

  &[name="title"] {
    padding: 0 17px;
  }
  &[name="title"],
  &[name="title"]::placeholder {
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
  }
  &[name="address"] {
    margin-top: 69px;
    padding: 0 20px;
    border-radius: 10px;
    opacity: 0.7;
    background: #18191e;
    width: 100%;
    height: 40px;
  }
  &[name="address"],
  &[name="address"]::placeholder {
    font-size: 14px;
    line-height: 40px;
  }
  &[name="tag"] {
    width: 100%;
    height: 45px;
    margin-top: 10px;
  }
  &[name="tag"],
  &[name="tag"]::placeholder {
    font-size: 18px;
    line-height: 44px;
  }
`;

const TextEditorBox = styled.div`
  margin-top: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #666;
  padding-bottom: 20px;

  .quill {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .ql-toolbar {
    border: 1px solid #666;
    border-left: none;
    border-right: none;
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
    border: none;
  }
  .ql-editor {
    padding-top: 28px;
  }
`;

export default AddEditPost;
