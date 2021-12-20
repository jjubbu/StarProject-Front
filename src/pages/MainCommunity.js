import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import _ from "lodash";

import { apis } from "../lib/axios";
import ic_write from "../img/ic_write.svg";
import ic_search from "../img/ic_search.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HelmetComp from "../components/HelmetComp";

import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/card";
import { textLogo } from "../redux/modules/header";

const MainCommunity = () => {
  const dispatch = useDispatch();

  const card_list = useSelector((state) => state.card.list);
  const is_login = useSelector((state) => state.login.is_login);

  const [pageNum, setPageNum] = React.useState({ current: 1, max: 2 });
  const [cardList, setCardList] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState();
  const [sort, setSort] = React.useState("star");

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
        apis
          .getCardAX(sort, searchKey, pageNum.current + 1)
          .then((response) => {
            const data = response.data.data;
            const mergeData = cardList.concat(...data.dataList);
            if (sort === "star") {
              dispatch(postActions.setCard(mergeData));
            } else {
              setCardList(mergeData);
            }
            setPageNum((prev) => ({ ...prev, max: data.maxPage }));
            setTimeout(100);
          });
      }
    }
  };

  const tapClick = (e) => {
    const name = e.target.getAttribute("name");
    setPageNum({ current: 1, max: 2 });
    setSort(name);
    const elements = document.getElementsByClassName("tab on");
    if (elements.length > 0) {
      elements[0].classList.remove("on");
      e.target.classList.add("on");
    }

    if (searchKey === "") {
      name === "star" ? setCardList(card_list) : getCard(name, "");
    } else {
      getCard(name, searchKey);
    }
  };

  const getCard = (sortWord, key) => {
    apis
      .getCardAX(sortWord, key, 1)
      .then((response) => {
        const data = response.data.data.dataList;
        setCardList(data);
      })
      .catch((err) => alert(err));
  };

  const inputValue = React.useCallback(
    _.debounce((e) => {
      const value = e.target.value;
      if (value === "") {
        setSearchKey("");
        getCard(sort, "");
      } else {
        const p = `&cityName=${value}`;
        setSearchKey(p);
        getCard(sort, p);
      }
    }, 500),
    [sort]
  );

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
                  onChange={inputValue}
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
  @media only screen and (max-width: 480px) {
    margin-top: -4px;
  }
`;

const Wrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
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
  @media only screen and (max-width: 720px) {
    padding-bottom: 68px;
    position: relative;
    .searchbox {
      position: absolute;
      bottom: 0px;
      width: 100%;
    }
    .searchbox::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background: #333;
      top: -20px;
      left: 0;
    }

    & > ul {
      p {
        font-weight: 400;
        font-size: 28px;
        line-height: 120%;
      }
      .line {
        bottom: -8px;
        height: 2px;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    align-items:end;
    margin-bottom:20px;
    .searchbox::before{
      top:-18px;
      z-index:0;
    }
    & > ul {
      .tab{
        height: 17px;
      }
      p {
        font-size: 14px;
      }
      .tab.on {
      p {
        font-weight: bold;
      }
    }
    .line{
      width: 100%;
      bottom:-12px;
      z-index:50;
    }
  }
  .btn-write{
    width:auto;
    height:auto;
    padding:0;

    img{display:none;}
    p{
      margin:0; 
      font-size: 14px;
      line-height: 18px;
      padding:8px 12px 6px 13px;
    }
  }
`;

export default MainCommunity;
