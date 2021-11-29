import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";
import { useHistory } from "react-router";
import Detail from "../pages/Detail";
import _ from "lodash";

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
import { result } from "lodash";
import { changeSortMW } from "../redux/modules/community";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HelmetComp from "../components/HelmetComp";

const MainCommunity = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const card_list = useSelector((state) => state.card.list);
  const page_info = useSelector((state) => state.card.paging);
  const is_login = useSelector((state) => state.login.is_login);
  const sort = useSelector((state) => state.community.sort);

  console.log(page_info);

  const [activeClass, setActive] = React.useState([true, false, false]);
  const [pageNum, setPageNum] = React.useState({ current: 1, max: 2 });

  React.useEffect(() => {
    dispatch(textLogo(false));
    dispatch(postActions.getCardDB("star", "", 1));
  }, [dispatch]);

  const scrollEvent = () => {
    let scrollHeight = document.getElementById("card_container").scrollHeight;
    let scrollTop = document.getElementById("card_container").scrollTop;
    let clientHeight = document.getElementById("card_container").clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (!(pageNum.current > pageNum.max)) {
        console.log(pageNum);

        setPageNum((prev) => ({ ...prev, current: pageNum.current + 1 }));
        dispatch(
          postActions.setPage({
            ...page_info,
            currentPage: page_info.currentPage + 1,
          })
        );
        apis.getCardAX(sort, "", pageNum.current + 1).then((response) => {
          console.log("scrollEvent:::", response);
          const data = response.data.data;
          const mergeData = card_list.concat(...data.dataList);
          dispatch(postActions.setCard(mergeData));
          setPageNum((prev) => ({ ...prev, max: data.maxPage }));
          setTimeout(500);
        });
      }
    }
  };

  // 검색

  const searchCity = (e) => {
    const text = e.target.value;
    const p = `&cityName=${text}`;

    if (window.event.keyCode === 13) {
      console.log("enter", p);
      dispatch(postActions.getSearchListDB(sort, p, 1));
    }
  };
  return (
    <React.Fragment>
      <HelmetComp title="커뮤니티" url="https://stellakorea.co.kr/community" />
      <div
        onScroll={scrollEvent}
        id="card_container"
        style={{ overflowY: "scroll" }}
      >
        <Header />
        <div className="CommonPageStyle">
          <CommunityPage id="commu_container">
            <TopDiv>
              <ul className="tab">
                <div className="tab-container1">
                  <div
                    className="star"
                    onClick={() => {
                      // dispatch(postActions.getCardDB("star", "", 1));
                      // setSort("star");
                      dispatch(changeSortMW("star"));
                      setActive([true, false, false]);
                      setPageNum((prev) => ({ ...prev, current: 1 }));
                    }}
                  >
                    <a class="recommend">추천순</a>
                  </div>
                  {activeClass[0] ? <li class="bottom__line1"></li> : false}
                </div>
                <div className="tab-container2">
                  <div
                    className="like"
                    onClick={() => {
                      // dispatch(postActions.getCardDB("like", "", 1));
                      // setSort("like");
                      dispatch(changeSortMW("like"));
                      setPageNum((prev) => ({
                        ...prev,
                        current: 1,
                      }));

                      setActive([false, true, false]);
                    }}
                  >
                    <a className="popular">인기순</a>
                  </div>
                  {activeClass[1] ? <li class="bottom__line2"></li> : false}
                </div>

                <div className="tab-container3">
                  <div
                    className="latest"
                    onClick={() => {
                      // dispatch(postActions.getCardDB("latest", "", 1));
                      // setSort("latest");
                      setPageNum((prev) => ({ ...prev, current: 1 }));

                      dispatch(changeSortMW("latest"));
                      setActive([false, false, true]);
                    }}
                  >
                    <a className="latest">최신순</a>
                  </div>
                  {activeClass[2] ? <li class="bottom__line3"></li> : false}
                </div>
              </ul>
              <div className="searchbox">
                <div className="searchbar">
                  <img src={ic_search} alt="ic_search" />
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    onKeyPress={searchCity}
                    // onChange={(e) => {
                    //   getSearchAuto(e);
                    //   searchValueChange(e);
                    // }}
                    // value={searchValue}
                  />
                </div>
              </div>

              <button
                className="btn-write"
                onClick={() => {
                  !is_login
                    ? history.push("/login")
                    : history.push("/post/add");
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
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const CommunityPage = styled.main`
  /* overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  } */
  height: 100%;
`;

const Wrapper = styled.div`
  gap: 24px;
  display: flex;
  /* box-sizing: border-box; */
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  /* overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  } */
`;

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
    width: 277px;
    padding-bottom: 10px;

    .tab-container1 {
      width: 85px;
      align-items: center;
      display: flex;
      justify-content: center;
      position: relative;
      .star {
        width: 67px;
        font-size: 24px;
        color: white;
        text-align: center;

        a {
          cursor: pointer;
        }
      }
    }

    .bottom__line1 {
      position: absolute;
      top: 37px;
      width: 85px;
      height: 1px;
      background-color: #ffffff;
    }

    .tab-container2 {
      width: 85px;
      align-items: center;
      display: flex;
      justify-content: center;
      position: relative;
      .like {
        width: 67px;
        font-size: 24px;
        text-align: center;
        color: white;

        a {
          cursor: pointer;
        }
      }
      .bottom__line2 {
        position: absolute;
        top: 37px;
        width: 85px;
        height: 1px;
        background-color: #ffffff;
      }
    }

    .tab-container3 {
      width: 85px;
      align-items: center;
      display: flex;
      justify-content: center;
      position: relative;
      .latest {
        width: 67px;
        font-size: 24px;
        text-align: center;
        color: white;

        a {
          cursor: pointer;
        }
      }
      .bottom__line3 {
        position: absolute;
        top: 37px;
        width: 85px;
        height: 1px;
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

const Container = styled.div`
  /* background-color : gray; */
  justify-content: center;
`;

export default MainCommunity;
