import React from "react";
import AWS from "aws-sdk";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import _ from "lodash";

import { apis } from "../lib/axios";
import { StyledInput } from "../elements/CommonInput";
import CustomToolbar from "../components/QuillCustomToolbar";
import ic_save from "../img/ic_save.svg";
import HelmetComp from "../components/HelmetComp";

import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as editDataAction } from "../redux/modules/edit";
import { actionCreators as loginCheckAction } from "../redux/modules/login";

const AddEditPost = () => {
  const [pathNow, setPathNow] = React.useState("add");
  const [quillValue, setQuillValue] = React.useState();
  const [quillImage, setQuillImage] = React.useState([]);
  const [quillImagebase, setQuillImagebase] = React.useState([]);
  const [warn, setWarn] = React.useState("none");
  const [inputValue, setInputValue] = React.useState({
    title: "",
    address: "",
  });
  const imageInputREF = React.useRef();
  const QuillREF = React.useRef();
  const titleREF = React.useRef();
  const addressREF = React.useRef();

  const editData = useSelector((state) => state.edit.data);
  const is_login = useSelector((state) => state.login.is_login);
  const dispatch = useDispatch();

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:9fd6954c-e11d-4e32-977b-f9457383a30a",
    }),
  });

  const imageInputClick = (e) => {
    const reader = new FileReader();
    const file = imageInputREF.current.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
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
    "video",
    "color",
    "align",
  ];

  const addressCheck = React.useMemo(
    (e) =>
      _.debounce((e) => {
        const address = e.target.value;
        apis.getCheckAddressAX(address).then((response) => {
          const data = response.data;
          if (data.code === 200) {
            setWarn("none");
          } else {
            setWarn("warn");
          }
        });
      }, 500),
    []
  );

  let uploadClick = false;

  const uploadPost = async () => {
    if (!uploadClick) {
      uploadClick = true;
    } else {
      return;
    }
    let List = {};
    for (let i = 0; i < quillImage.length; i++) {
      List[quillImagebase[i]] = quillImage[i].name;
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

    let uploadResult = {
      content: content,
      img:
        quillImage.length > 0
          ? String(
              "https://star-project-post-storage.s3.ap-northeast-2.amazonaws.com/" +
                quillImage[0]?.name
            )
          : "",
      title: titleREF.current.value,
      address: addressREF.current.value,
    };
    let contentInner = String(uploadResult.content).replace(
      /<[^>]+>/g,
      ""
    ).length;

    if (
      Object.keys(uploadResult).find(
        (key) => key !== "img" && uploadResult[key] === ""
      )
    ) {
      alert("?????? ?????? ????????? ?????? ??????????????????!");
      return;
    } else if (contentInner === 9) {
      alert("????????? ????????? ??????????????????!");
      return;
    } else {
      if (warn === "warn") {
        alert("????????? ????????? ??????????????????");
      } else {
        if (quillImage.length > 0) {
          quillImage.forEach((l, idx) => {
            const upload = new AWS.S3.ManagedUpload({
              params: {
                Bucket: "star-project-post-storage",
                Key: l.name,
                Body: l,
              },
            });
            const promise = upload.promise();
            promise.then(
              function (data) {},
              function (err) {}
            );
          });
        }
        if (pathNow === "add") {
          apis.postAddPostAX(uploadResult).then((response) => {
            if (response.data.code === 200) {
              history.push("/community");
            }
          });
        } else {
          let editResult = {
            content: content,
            title: titleREF.current.value,
            address: addressREF.current.value,
          };
          apis
            .putEditPostAX(editData.id, editResult)
            .then((response) => {
              if (response.data.code === 200) {
                dispatch(editDataAction.deleteData());
                history.goBack();
              }
            })
            .catch((err) => {
              alert(err);
            });
        }
      }
    }
  };

  const inputDataSet = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  React.useEffect(() => {
    const path = history.location.pathname.split("/post/").join("");
    if (!is_login) {
      history.push("/login");
    }
    if (path === "edit" && editData.content !== "") {
      setPathNow("edit");
      setQuillValue(editData.content);
      setInputValue({ title: editData.title, address: editData.address });
    } else if (path === "edit") {
      history.push("/community");
    }
  }, []);

  return (
    <React.Fragment>
      <HelmetComp
        title="????????? ????????????"
        url={
          pathNow === "add"
            ? `https://stellakorea.co.kr/post/add`
            : `https://stellakorea.co.kr/community`
        }
      />

      <AddEditStyled className="CommonPageStyle CommonGap">
        <AddEditHeader>
          <h3>????????? {pathNow === "add" ? "????????????" : "????????????"}</h3>
          <button onClick={uploadPost}>
            ????????? <img src={ic_save} alt="save" />
          </button>
        </AddEditHeader>
        <PostWriteBox>
          <PostInput
            type="text"
            name="title"
            placeholder="????????? ??????????????????"
            ref={titleREF}
            value={inputValue.title}
            onChange={inputDataSet}
          />
          <TextEditorBox className="textEditor">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              ref={imageInputREF}
              id="imgInput"
              onChange={imageInputClick}
              multiple
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
              placeholder="????????? ????????? ???????????? ??????????????????."
              onChange={(e) => {
                addressCheck(e);
                inputDataSet(e);
              }}
              border={warn}
              ref={addressREF}
              value={inputValue.address}
            />
          </TextEditorBox>

          {/* <PostInput
            type="text"
            name="tag"
            placeholder="# ??????????????? ??????????????????"
            className="openSans"
          /> */}
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
  @media only screen and (max-width: 720px) {
    gap: 0;
  }
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
  @media only screen and (max-width: 720px) {
    h3 {
      font-size: 28px;
      padding-bottom: 32px;
      border-bottom: 1px solid #333;
      width: 100vw;
      transform: translateX(-20px);
    }
    button {
      padding: 6px 13px;
      img {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    h3 {
      font-size: 14px;
      line-height: 20px;
      padding-bottom: 16px;
    }
    button {
      font-size: 12px;
      line-height: 15px;
      height: 28px;
      img {
        display: none;
      }
    }
  }
`;

const PostWriteBox = styled.main`
  background-color: #303136;
  border-radius: 10px;
  padding: 38px 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 720px) {
    background: #18191e;
    width: 100vw;
    transform: translateX(-20px);
    padding: 0;
  }
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
  @media only screen and (max-width: 720px) {
    &[name="title"] {
      padding: 0 20px;
    }
    &[name="title"],
    &[name="title"]::placeholder {
      font-weight: normal;
    }
    &[name="address"] {
      padding: 10px 20px;
      border: 1px solid #303136;
      border-radius: 0;
      border-left: none;
      border-right: none;
      opacity: 1;
      color: ${(props) => (props.border === "warn" ? "#CE3030" : "white")};
      margin: 0;
    }
    &[name="address"],
    &[name="address"]::placeholder {
      font-size: 14px;
      line-height: 40px;
    }
  }
  @media only screen and (max-width: 480px) {
    &[name="title"],
    &[name="title"]::placeholder {
      font-size: 14px;
      line-height: 20px;
    }
    &[name="address"],
    &[name="address"]::placeholder {
      line-height: 20px;
    }
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
    opacity: 0;
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
  @media only screen and (max-width: 720px) {
    border-bottom: none;
    padding-bottom: 0px;
    margin: 0;
    .ql-toolbar {
      justify-content: center;
      border: 1px solid #303136;
      border-left: none;
      border-right: none;
    }
  }
`;

export default AddEditPost;
