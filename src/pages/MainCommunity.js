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
