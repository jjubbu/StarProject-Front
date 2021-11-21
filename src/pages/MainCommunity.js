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
import { actionCreators as loginCheckAction } from "../redux/modules/login";

import { apis } from "../lib/axios";

import ic_write from "../img/ic_write.svg";
import ic_search from "../img/ic_search.svg";

const MainCommunity = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const card_list = useSelector((state) => state.card.list);
  const [activeClass, setActive] = React.useState([true, false, false]);

  console.log(card_list);

  const is_login = useSelector((state) => state.login.is_login);

  React.useEffect(() => {
    dispatch(textLogo(false));
    dispatch(postActions.getCardDB("star"));
  }, []);

  return (
    <React.Fragment>
      <CommunityPage className="CommonPageStyle">
        <TopDiv>
          <ul className="tab">
            <div
              className="star"
              onClick={() => {
                dispatch(postActions.getCardDB("star"));
                setActive([true, false, false]);
              }}
            >
              <a class="recommend">추천순</a>
              {activeClass[0] ? <li class="bottom__line1"></li> : false}
            </div>
            <div
              className="like"
              onClick={(like) => {
                dispatch(postActions.getCardDB("like"));
                setActive([false, true, false]);
              }}
            >
              <a className="popular">인기순</a>
              {activeClass[1] ? <li class="bottom__line2"></li> : false}
            </div>
            <div
              className="latest"
              onClick={(like) => {
                dispatch(postActions.getCardDB("latest"));
                setActive([false, false, true]);
              }}
            >
              <a className="latest">최신순</a>
              {activeClass[2] ? <li class="bottom__line3"></li> : false}
            </div>
          </ul>
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
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 268px;

    .star {
      width: 67px;
      font-size: 24px;
      color: white;
      text-align: center;
      z-index: 2;
      a {
        cursor: pointer;
      }
      .bottom__line1 {
        position: relative;
        z-index: 1;
        top: 10px;
        /* left: 2px; */
        width: 67px;
        height: 2px;
        background-color: #ffffff;
      }
    }

    .like {
      width: 67px;
      font-size: 24px;
      text-align: center;
      color: white;
      a {
        cursor: pointer;
      }
      .bottom__line2 {
        position: relative;
        top: 10px;
        width: 67px;
        height: 2px;
        background-color: #ffffff;
      }
    }

    .latest {
      width: 67px;
      font-size: 24px;
      text-align: center;
      color: white;
      a {
        cursor: pointer;
      }
      .bottom__line3 {
        position: relative;
        top: 10px;
        width: 65px;
        height: 2px;
        background-color: #ffffff;
      }
    }
  }

  .searchbar {
    width: 772px;
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
