import React from "react";
import styled from "styled-components";

import arrow from "../img/arrow.svg";
import ic_map from "../img/map/ic_map.svg";
import ic_star from "../img/ic_star.svg";
import ic_bookmark_off from "../img/ic_bookmark_off.svg";
import ic_bookmark_on from "../img/ic_bookmark_on.svg";
import ic_logo from "../img/ic_logo.svg";
import HelmetComp from "../components/HelmetComp";

import { apis } from "../lib/axios";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { textLogo } from "../redux/modules/header";
import { actionCreators as loginCheckAction } from "../redux/modules/login";

const Main = () => {
  const [boardList, setBoardList] = React.useState([
    {
      address: "",
      bookmark: false,
      contents: "",
      id: 0,
      img: "",
      starGazing: 0,
      title: "",
    },
  ]);
  const is_login = useSelector((state) => state.login.is_login);
  const dispatch = useDispatch();

  const bookmarkCheck = (id, idx) => {
    if (!is_login) {
      history.push("/login");
    }
    apis
      .postBookmarkAX(id)
      .then((response) => {
        const check = response.data.data.bookmarkCheck;
        let newList = [...boardList];
        newList[idx].bookmark = check;
        setBoardList(newList);
      })
      .catch((err) => {
        alert(err);
      });
  };

  React.useEffect(() => {
    dispatch(textLogo(true));
    dispatch(loginCheckAction.isLoginMW());
    apis
      .getMainBoardAX()
      .then((response) => {
        if (response.data.msg === "성공") {
          setBoardList(response.data.data);
        } else {
          alert(`main board list ${response.data.msg}`);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, [dispatch]);
  return (
    <React.Fragment>
      <HelmetComp />
      <StyldMain className="CommonGap">
        <VisualBox>
          <video loop autoPlay muted>
            <source
              src="https://stella-image-storage.s3.ap-northeast-2.amazonaws.com/Night+Sky.mp4"
              type="video/mp4"
            />
          </video>
          <h3 className="visualText">
            밤하늘 야경 명당 캠핑장 <br />
            실시간 별자리 찾기
          </h3>
          <img src={arrow} alt="scroll down" />
        </VisualBox>
        <ContentBox>
          <h3>별보기 좋은 곳</h3>
          <ul>
            {boardList.map((l, idx) => {
              return (
                <Card
                  key={idx}
                  onClick={() => {
                    history.push(`detail/${l.id}`);
                  }}
                >
                  <ImageBox img={l.img}>
                    <Address>
                      <img src={ic_map} alt="address icon" />
                      <p>{l.address}</p>
                    </Address>
                    <img
                      src={l.img ? l.img : ic_logo}
                      alt="camp"
                      className="campImage"
                    />
                  </ImageBox>
                  <div className="contentBox">
                    <CardContent>
                      <h3>{l.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: l.contents }}
                      ></div>
                    </CardContent>
                    <CardEtcBox>
                      <div className="starGazing">
                        <img src={ic_star} alt="star gazing icon" />{" "}
                        <p>관측지수</p>
                        <span className="openSans">{l.starGazing}</span>
                      </div>

                      <img
                        src={l.bookmark ? ic_bookmark_on : ic_bookmark_off}
                        alt="bookmark"
                        className="bookmark"
                        cardid={l.id}
                        onClick={(e) => {
                          bookmarkCheck(l.id, idx);
                          e.stopPropagation();
                        }}
                      />
                    </CardEtcBox>
                  </div>
                </Card>
              );
            })}
          </ul>
        </ContentBox>
      </StyldMain>
    </React.Fragment>
  );
};

const StyldMain = styled.div``;

const VisualBox = styled.section`
  height: 772px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  video {
    position: absolute;
    width: 100%;
    height: 890px;
    object-fit: cover;
    top: 0;
    z-index: -10;
    background-position: center;
    background-size: cover;
  }

  .visualText {
    padding-top: 227px;
    font-weight: bold;
    font-size: 56px;
    line-height: 70px;
    text-align: center;
  }
  img {
    width: 25.5px;
    height: 55px;
    margin-bottom: 41px;
  }
`;

const ContentBox = styled.main`
  max-width: 1200px;
  margin: 100px auto 114px;

  & > h3 {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
  }
  ul {
    display: flex;
    width: 100%;
    gap: 24px;
    margin-top: 24px;
  }
`;

const Card = styled.li`
  width: 100%;
  height: 482px;
  border-radius: 10px;
  overflow: hidden;
  background: #303136;
  display: flex;
  flex-direction: column;
  .contentBox {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 194px;
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.65);
    transition: all 0.5s;
  }
`;
const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 288px;
  display: flex;
  align-items: center;
  justify-content: center;
  .campImage {
    ${(props) =>
      props.img !== ""
        ? "width: 100%; height: 288px;"
        : "width:128px; height:128px; margin-top:2px;"}

    object-fit: cover;
  }
`;
const Address = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 28px;
  display: flex;
  padding: 5px 12px 5px 8px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 14px;
  top: 20px;
  left: 20px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  p {
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
  }
`;

const CardContent = styled.section`
  padding: 28px 20px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
  }

  div {
    font-size: 16px;
    line-height: 18px;
    color: #cccccc;
    padding-top: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top: 1px;
    max-height: 80px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

const CardEtcBox = styled.div`
  padding: 19px 20px 17px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #666666;
  .starGazing {
    display: flex;
    align-items: center;

    p {
      margin: 0 4px 0 8px;
      font-size: 16px;
      line-height: 20px;
    }
    span {
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
    }
  }
  .bookmark {
    display: flex;
    align-items: center;
    img {
      margin-right: 4px;
    }
    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
    }
  }
`;

export default Main;
