import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";
import { useHistory } from "react-router";
import { Write } from "./Write";

import Detail from "../pages/Detail";

// redux
import card, { actionCreators as postActions } from "../redux/modules/card";
import { actionCreators as likeActions } from "../redux/modules/like";
import { useSelector, useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { api } from "../shared/apis";

import ic_write from "../img/ic_write.svg";
import ic_search from "../img/ic_search.svg";

const MainCommunity = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const card_list = useSelector((state) => state.card.list);
  const like_list = useSelector((state) => state.like_list);

  console.log(like_list);
  console.log(card_list);

  const test_card_list = [
    {
      id: 1,
      writer: "salmon",
      title: "불멍하러 가기 좋은 곳 ",
      address: "경기도 양평군 옥천면 신복리 산201",
      img: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
      like: 120,
      bookmark: 40,
      contents:
        "산 좋고 물좋은 곳에서 강아지와 멍때리고 놀기 아주 좋은 곳 깨끗한 공기를 마시니 숨통이 트이는 기분 다음에는 우리 가족과",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 2,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2020/02/04/10/42/people-4817872__340.jpg",
      like: 130,
      bookmark: 42,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 3,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2020/01/11/07/39/north-4756774__340.jpg",
      like: 100,
      bookmark: 45,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 4,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2017/07/31/21/55/people-2561455__340.jpg",
      like: 110,
      bookmark: 50,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
    {
      id: 5,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2018/12/24/22/21/camping-3893598__340.jpg",
      like: 110,
      bookmark: 20,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },

    {
      id: 6,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2015/10/14/14/30/camping-987707__340.jpg",
      like: 120,
      bookmark: 50,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },

    {
      id: 7,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2015/12/24/13/17/camping-1106782__340.jpg",
      like: 99,
      bookmark: 30,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },

    {
      id: 8,
      writer: "salmon",
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2015/05/13/05/40/tent-765064__480.jpg",
      like: 3,
      bookmark: 98,
      contents: "본문",
      modifiedAt: "yyyy-MM-dd HH:mm",
    },
  ];

  React.useEffect(() => {
    dispatch(textLogo(false));
    dispatch(postActions.getCardDB());
  }, []);

  return (
    <React.Fragment>
      <CommunityPage className="CommonPageStyle">
        <TopDiv>
          <div className="tab">
            <div className="recommend">추천</div>
            <div className="popular">인기순</div>
          </div>
          <div className="searchbar">
            <img src={ic_search} alt="ic_search" />
            <input type="text" placeholder="검색어를 입력하세요" />
          </div>
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
          {card_list.map((p, i) => {
            return (
              <Card key={i} cardID={p.id} {...p}>
                {/* {test_card_list} */}
              </Card>
            );
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
      /* height: 40px; */
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

  .searchbar {
    width: 861px;
    height: 40px;
    background: #303136;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 8px 0px 8px 15px;

    img {
      margin-right: 12px;
    }

    input {
      background: none;
      border: none;
      width: 100%;
      color: #eeeeee;
      :focus {
        outline: none;
        color: #eeeeee;
      }

      ::placeholder {
        color: #eeeeee;
        font-size: 14px;
      }
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
