import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";
import { useHistory } from "react-router";
import { Write } from "./Write";

import { useState } from "react";

// redux
import card, { actionCreators as postActions } from "../redux/modules/card";
import { useSelector, useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";

import ic_write from "../img/ic_write.svg";

const MainCommunity = (props) => {
  // const card_list = useSelector((state) => state.card.list);
  const dispatch = useDispatch();
  const history = useHistory();

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
    // dispatch(postActions.getCardDB());
    dispatch(textLogo(false));
  }, []);

  return (
    <React.Fragment>
      <CommunityPage className="CommonPageStyle">
        <TopDiv>
          {/* <div className="tab">
            <div className="recommend">추천</div>
            <div className="popular">인기순</div>
          </div> */}
          <div className="search bar"></div>
          <button
            className="btn-write"
            onClick={() => {
              history.push("/post/add");
            }}
          >
            <p>글쓰기</p>
            <img src={ic_write} alt="ic_write" />
          </button>
        </TopDiv>
        <Wrapper>
          {test_card_list.map((p, i) => {
            return <Card key={i} {...p} />;
          })}
        </Wrapper>
      </CommunityPage>
    </React.Fragment>
  );
};

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 40px; */
  margin-bottom: 32px;

  .tab {
    display: flex;
    align-items: center;
    height: 40px;

    .recommend {
      width: 85px;
      height: 40px;
      font-size: 24px;
      color: white;
      text-align: center;
      /* border-bottom: 2px solid #ffffff; */
    }

    .popular {
      width: 85px;
      font-size: 24px;
      text-align: center;
      color: white;
    }
  }

  .btn-write {
    width: 112px;
    height: 40px;
    padding: 10px 0px 10px 21px;
    background: #4688ec;
    border-radius: 4px;
    border: none;
    float: right;
    display: flex;
    align-items: center;
    :hover {
      cursor: pointer;
    }

    p {
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      margin-right: 10px;
    }
  }
`;

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
