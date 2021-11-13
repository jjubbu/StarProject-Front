import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";
import { useState } from "react";
import Detail from "../pages/Detail";

// redux
import card, { actionCreators as postActions } from "../redux/modules/card";
import { useSelector, useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { api } from "../shared/apis";

const MainCommunity = (props) => {
  const dispatch = useDispatch();

  const test_card_list = [
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "서울시 강남구 역삼동",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 120,
      bookmark: 40,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 130,
      bookmark: 42,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 100,
      bookmark: 45,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 110,
      bookmark: 50,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 110,
      bookmark: 20,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },

    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 120,
      bookmark: 50,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },

    {
      id: 1,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      like: 99,
      bookmark: 30,
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
      bookmark: 98,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
  ];

  React.useEffect(() => {
    dispatch(textLogo(false));
  }, []);

  return (
    <React.Fragment>
      <CommunityPage className="CommonPageStyle">
        <Wrapper>
          {test_card_list.map((p, i) => {
            return (
              <Card key={i} cardID={p.id} {...p}>
                {test_card_list}
              </Card>
            );
          })}
        </Wrapper>
      </CommunityPage>
    </React.Fragment>
  );
};

const CommunityPage = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.main`
  gap: 24px;
  display: flex;
  /* box-sizing: border-box; */
  flex-wrap: wrap;
  justify-content: center;
  /* margin: auto; */
  /* overflow-y: scroll; */

  /* ::-webkit-scrollbar {
    display: none; */
  /* } */
`;

const Container = styled.div`
  /* background-color : gray; */
  justify-content: center;
`;

export default MainCommunity;
