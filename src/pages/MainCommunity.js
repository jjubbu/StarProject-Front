import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";
import { useHistory } from "react-router";
import { Write } from "./Write";
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

const MainCommunity = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const card_list = useSelector((state) => state.card.list);
  const page_info = useSelector((state) => state.card.paging);
  const is_login = useSelector((state) => state.login.is_login);

  const [activeClass, setActive] = React.useState([true, false, false]);

  // 무한스크롤

  const currentPage = page_info.currentPage;
  const maxPage = page_info.maxPage;
  console.log(currentPage);

  const [resultList, setResultList] = React.useState([{}]);
  const [searchList, setSearchList] = React.useState([{}]);
  const [searchValue, setSearchValue] = React.useState("");
  const [pageNum, setPageNum] = React.useState({ page: 1, max: 1 });
  const [is_search, setSearch] = React.useState(false);
  const [dataSize, setDataSize] = React.useState(0);
  const [params, setParams] = React.useState("");
  const [sort, setSort] = React.useState("");

  React.useEffect(() => {
    dispatch(textLogo(false));
    dispatch(postActions.getCardDB("star", "", 1));
  }, []);

  // 무한스크롤
  const scrollEvent = (e) => {
    let scrollHeight = document.getElementById("container").scrollHeight;
    let scrollTop = document.getElementById("container").scrollTop;
    let clientHeight = document.getElementById("container").clientHeight;

    console.log(scrollHeight);
    console.log(scrollTop);
    console.log(clientHeight);

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("scrollTop::::", e.target.scrollTop);
      if (currentPage >= maxPage) {
        console.log(currentPage);
        console.log(maxPage);
        console.log("더 이상 페이지 없음");
      } else {
        // setPageNum((prev) => ({ ...prev, page: pageNum.page + 1 }));
        console.log("currentPage", currentPage);

        // dispatch(postActions.getCardDB(params, Number(pageNum.page + 1)));
        dispatch(
          postActions.getInfinityScrollCardDB(
            sort,
            params,
            Number(currentPage + 1)
          )
        );
        // apis
        //   .getCardAX(params, Number(pageNum.page + 1))
        //   .then(async (response) => {
        //     const data = response.data.data;
        //     console.log(data);
        //     const mergeData = resultList.concat(...data.dataList);
        //     setResultList(mergeData);
        //     setDataSize(data.dataSize);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    }
  };

  // 검색

  const searchCity = (e) => {
    const text = e.target.value;
    setParams(`&cityName=${text}`);

    if (window.event.keyCode === 13) {
      console.log("enter", text);
      dispatch(postActions.getSearchListDB(sort, params, 1));
    }

    // apis.getCardAX(params, 1).then((response) => {
    //   console.log("searchCity:::", response);
    //   const data = response.data.data;
    // });
  };

  const searchValueChange = (e) => {
    const text = e.target.value;
    console.log(e);
    setSearchValue(text);
  };

  const getSearchAuto = React.useCallback(
    _.debounce((e) => {
      const text = e.target.value;
      console.log(text);
      if (text !== "") {
        setSearch(true);
        apis
          .getMapSearchAX(text)
          .then((response) => {
            console.log(response.data.data);
            if (response.data.data.length !== 0) {
              setSearchList(response.data.data);
            } else {
              setSearchList([{ address: "검색 결과가 없습니다." }]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setSearch(false);
      }
    }, 500),
    []
  );

  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <CommunityPage id="container" onScroll={scrollEvent}>
          <TopDiv>
            <ul className="tab">
              <div
                className="star"
                onClick={() => {
                  dispatch(postActions.getCardDB("star", "", 1));
                  setSort("star");
                  setActive([true, false, false]);
                }}
              >
                <a class="recommend">추천순</a>
                {activeClass[0] ? <li class="bottom__line1"></li> : false}
              </div>
              <div
                className="like"
                onClick={() => {
                  dispatch(postActions.getCardDB("like", "", 1));
                  setSort("like");
                  setActive([false, true, false]);
                }}
              >
                <a className="popular">인기순</a>
                {activeClass[1] ? <li class="bottom__line2"></li> : false}
              </div>
              <div
                className="latest"
                onClick={() => {
                  dispatch(postActions.getCardDB("latest", "", 1));
                  setSort("latest");
                  setActive([false, false, true]);
                }}
              >
                <a className="latest">최신순</a>
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
      </div>
    </React.Fragment>
  );
};

const CommunityPage = styled.main`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  height: 100%;
`;

const Wrapper = styled.main`
  gap: 24px;
  display: flex;
  /* box-sizing: border-box; */
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  /* overflow-y: scroll; */

  ::-webkit-scrollbar {
    display: none;
  }
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

const Container = styled.div`
  /* background-color : gray; */
  justify-content: center;
`;

export default MainCommunity;
