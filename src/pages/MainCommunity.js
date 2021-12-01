import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useHistory } from "react-router";

import { apis } from "../lib/axios";
import ic_write from "../img/ic_write.svg";
import ic_search from "../img/ic_search.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HelmetComp from "../components/HelmetComp";

import { actionCreators as postActions } from "../redux/modules/card";
import { useSelector, useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { changeSortMW } from "../redux/modules/community";

const MainCommunity = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const card_list = useSelector((state) => state.card.list);
  const is_login = useSelector((state) => state.login.is_login);
  const sort = useSelector((state) => state.community.sort);

  const [pageNum, setPageNum] = React.useState({ current: 1, max: 2 });
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    dispatch(textLogo(false));
    dispatch(postActions.getCardDB("star", "", 1));
  }, [dispatch]);

  React.useEffect(() => {
    setCardList(card_list);
  }, [card_list]);

  const scrollEvent = () => {
    let scrollHeight = document.getElementById("card_container").scrollHeight;
    let scrollTop = document.getElementById("card_container").scrollTop;
    let clientHeight = document.getElementById("card_container").clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (!(pageNum.current > pageNum.max)) {
        setPageNum((prev) => ({ ...prev, current: pageNum.current + 1 }));
        apis.getCardAX(sort, "", pageNum.current + 1).then((response) => {
          const data = response.data.data;
          const mergeData = cardList.concat(...data.dataList);
          if (sort === "star") {
            dispatch(postActions.setCard(mergeData));
          } else {
            setCardList(mergeData);
          }
          setPageNum((prev) => ({ ...prev, max: data.maxPage }));
          setTimeout(100);
          console.log(response);
        });
      }
    }
  };

  const searchCity = (e) => {
    const text = e.target.value;
    const p = `&cityName=${text}`;
    if (window.event.keyCode === 13) {
      dispatch(postActions.getSearchListDB(sort, p, 1));
    }
  };

  const tapClick = (e) => {
    const name = e.target.getAttribute("name");
    setPageNum({ current: 1, max: 2 });
    dispatch(changeSortMW(name));

    const elements = document.getElementsByClassName("tab on");
    if (elements.length > 0) {
      elements[0].classList.remove("on");
      e.target.classList.add("on");
    }

    if (name === "star") {
      setCardList(card_list);
    } else {
      apis.getCardAX(name, "", 1).then((response) => {
        const data = response.data.data.dataList;
        setCardList(data);
      });
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
              <ul id="nav">
                <div className="tab on" name="star" onClick={tapClick}>
                  <p class="recommend">추천순</p>
                  <span className="line" />
                </div>
                <div className="tab" name="like" onClick={tapClick}>
                  <p className="popular">인기순</p>
                  <span className="line" />
                </div>
                <div className="tab" name="latest" onClick={tapClick}>
                  <p className="latest">최신순</p>
                  <span className="line" />
                </div>
              </ul>
              <label className="searchbox">
                <img src={ic_search} alt="ic_search" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  onKeyPress={searchCity}
                  className="openSans"
                />
              </label>

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
              {cardList.map((p, i) => {
                return <Card key={i} cardID={p.id} {...p}></Card>;
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
  height: 100%;
  flex: 1;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;

const TopDiv = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  & > ul {
    display: flex;
    gap: 29px;
    padding-left: 9px;

    .tab {
      height: 40px;
      align-items: flex-start;
      display: flex;
      justify-content: center;
      position: relative;
      cursor: pointer;
    }

    p {
      font-size: 24px;
      line-height: 30px;
      color: #999;
      text-align: center;
      pointer-events: none;
    }

    .line {
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      width: 85px;
      height: 1px;
      background-color: none;
    }
    .tab.on {
      p {
        color: #fff;
      }
      .line {
        background-color: #fff;
      }
    }
  }

  .searchbox {
    display: flex;
    flex: 1;
    gap: 16px;
    height: 40px;
    background: #303136;
    border-radius: 10px;
    align-items: center;
    padding: 8px 0px 8px 16px;

    input {
      background: none;
      border: none;
      width: 100%;
      color: #eeeeee;
      :focus {
        outline: none;
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

export default MainCommunity;
