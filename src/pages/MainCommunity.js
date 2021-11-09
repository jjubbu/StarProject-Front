import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";

import { useState } from "react";

// redux
import card, { actionCreators as postActions } from "../redux/modules/card";
import { useSelector, useDispatch } from "react-redux";

const MainCommunity = (props) => {
  // const card_list = useSelector((state) => state.card.list);
  const dispatch = useDispatch();

  const test_card_list = [
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 3,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 3,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 3,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 3,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 3,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
  ];

  React.useEffect(() => {
    // dispatch(postActions.getCardDB());
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        {test_card_list.map((p, i) => {
          return <Card key={p.id} {...p} />;
        })}
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  overflow: scroll;
`;
const Container = styled.div`
  /* background-color : gray; */
  justify-content: center;
`;

export default MainCommunity;
