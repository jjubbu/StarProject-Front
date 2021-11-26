import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as loginCheckAction } from "../redux/modules/login";
import { apis } from "../lib/axios";

const Write = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.writer.is_login);
  const preview = useSelector((state) => state.img.preview);
  const write_list = useSelector((state) => state.write.list);

  console.log(props.match.params.id);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? write_list.find((props) => props.id === post_id) : null;

  const [data, setData] = React.useState({
    currentPage: "1",
    maxPage: "10",
    dataSize: "4",
    dataList: [
      { id: "3", title: "제목", content: "본문 내용 (100자)", img: "/src" },
    ],
  });

  const changeData = (e) => {
    setData(e.target.data);
  };

  const addPost = () => {
    apis.postAddPostAX(props.id).then((response) => {});
  };

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없습니다.");
      history.goBack();

      return;
    }
  });

  return;
  <React.Fragment></React.Fragment>;
};

export default Write;

const UploadButton = styled.button`
  color: blue;
`;

// console.log(props.match.params.id);
