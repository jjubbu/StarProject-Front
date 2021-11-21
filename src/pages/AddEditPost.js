import React from "react";
import AWS from "aws-sdk";
import styled from "styled-components";
import ReactQuill from "react-quill";
import _ from "lodash";

import "react-quill/dist/quill.snow.css";
import { StyledInput } from "../elements/CommonInput";
import ic_save from "../img/ic_save.svg";
import CustomToolbar from "../components/QuillCustomToolbar";
import { apis } from "../lib/axios";

const AddEditPost = () => {
  const [quillValue, setQuillValue] = React.useState();
  const [quillImage, setQuillImage] = React.useState([]);
  const [quillImagebase, setQuillImagebase] = React.useState([]);
  const [quillResult, setQuillResult] = React.useState({
    title: "",
    content: "",
    address: "",
    img: "",
  });
  const [warn, setWarn] = React.useState("none");
  const [canUpload, setCanUpload] = React.useState(true);
  const imageInputREF = React.useRef();
  const QuillREF = React.useRef();
  const titleREF = React.useRef();

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:9fd6954c-e11d-4e32-977b-f9457383a30a", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const imageInputClick = (e) => {
    const reader = new FileReader();
    const file = imageInputREF.current.files[0];
    console.log("file:::", file);
    if (file) {
      //파일을 읽어온다!
      reader.readAsDataURL(file);
      //파일 읽은 후 실행할 행동!
      reader.onloadend = () => {
        // const range = quill.getSelection();
        const quill = QuillREF.current.getEditor();
        const range = quill.getSelection()?.index;
        quill.insertEmbed(range, "image", reader.result);
        setQuillImagebase((prev) => [...prev, reader.result]);
        setQuillImage((prev) => [...prev, file]);
      };
    }
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

  const addressCheck = React.useCallback(
    _.debounce((e) => {
      const address = e.target.value;
      const korean = /^[ㄱ-ㅎ|가-힣|0-9|]+$/;
      console.log(e.target.value);
      if (korean.test(address)) {
        apis.getCheckAddressAX(address).then((response) => {
          console.log("check address AX :::", response);
          const data = response.data;
          if (data.code === 200) {
            setWarn("none");
            setQuillResult((prev) => ({ ...prev, address: address }));
          } else {
            setWarn("warn");
          }
        });
      } else {
        setWarn("warn");
      }
    }, 500),
    []
  );

  const uploadPost = async () => {
    if (quillImage.length > 0) {
      quillImage.map((l, idx) => {
        // S3 SDK에 내장된 업로드 함수
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: "star-project-post-storage", // 업로드할 대상 버킷명
            Key: l.name, // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
            Body: l, // 업로드할 파일 객체
          },
        });
        const promise = upload.promise();
        promise.then(
          function (data) {
            console.log("이미지 업로드에 성공했습니다.");
          },
          function (err) {
            return console.log("오류가 발생했습니다: ", err.message);
          }
        );
      });
    }
    let List = {};
    for (let i = 0; i < quillImage.length; i++) {
      List[quillImagebase[i]] = quillImage[i].name;
      // List = {base:link,base:link, ...}
    }
    let content = quillValue;
    await quillImagebase.forEach((x, idx) => {
      content = content
        .split(x)
        .join(
          "https://star-project-post-storage.s3.ap-northeast-2.amazonaws.com/" +
            String(quillImage[idx].name)
        );
    });
    console.log("content:::", content);

    let uploadResult = {
      content: content,
      img: quillImage
        ? String(
            "https://star-project-post-storage.s3.ap-northeast-2.amazonaws.com/" +
              quillImage[0]?.name
          )
        : "",
      title: titleREF,
    };
    console.log("quillResult:::", uploadResult);

    if (
      Object.keys(uploadResult).find(
        (key) => key !== "img" && uploadResult[key] === ""
      )
    ) {
      alert("제목, 글 내용, 주소를 전부 입력해주세요!");
      return;
    } else {
      if (warn === "warn") {
        alert("주소를 알맞게 입력해주세요");
      } else {
        console.log("확인");
      }
    }
  };

  return (
    <React.Fragment>
      <AddEditStyled className="CommonPageStyle CommonGap">
        <AddEditHeader>
          <h3>커뮤니티 게시글 작성</h3>
          <button onClick={uploadPost}>
            업로드 <img src={ic_save} alt="save" />
          </button>
        </AddEditHeader>
        <PostWriteBox>
          <PostInput
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            ref={titleREF}
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
              value={quillValue || ""}
              onChange={(e) => {
                setQuillValue(e);
              }}
              modules={modules}
              formats={formats}
              ref={QuillREF}
            />
            <PostInput
              type="text"
              name="address"
              placeholder="캠핑한 장소의 주소를 입력하세요"
              onChange={addressCheck}
              border={warn}
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
    border: 1px solid
      ${(props) => (props.border === "warn" ? "#CE3030" : "none")};
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

  #imgInput {
    position: absolute;
    z-index: -9990;
  }

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
