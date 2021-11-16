import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainCommunity from "../pages/MainCommunity";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ic_sunny from "../img/ic_sunny.svg";
import ic_star from "../img/ic_star.svg";
import ic_moonrise from "../img/ic_moonrise.svg";
import ic_moonset from "../img/ic_moonset.svg";
import ic_mypage from "../img/ic_mypage.svg";
import { history } from "../redux/configureStore";
import { FaBorderNone, FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { getPostByID } from "../pages/MainCommunity";
import { actionCreators as loginCheckAction } from "../redux/modules/login";
import { setUserInfo } from "../redux/modules/login";

const Detail = ({ history, location, match }) => {
  const [data, setData] = useState({});
  const is_login = useSelector((state) => state.login.is_login);
  const { id } = match.params;

  const dispatch = useDispatch();

  React.useEffect(() => {
    // setData(getPostByID(id));
    dispatch(loginCheckAction.isLoginMW());
    console.log(window.location.pathname);
    dispatch(textLogo(false));
  }, []);

  const Delete = () => {};

  //지도 구현함수
  return (
    <React.Fragment>
      <div className="CommonPageStyle CommonGap">
        <StyledBox>
          {/*main*/}
          <div className="StyledBox2">
            <MapBox>
              <Map
                center={{ lat: 33.55635, lng: 126.795841 }}
                style={{ width: "100%", height: "290px" }}
              >
                <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                  <div style={{ color: "#000" }}>Hello World!</div>
                </MapMarker>
              </Map>
            </MapBox>

            <InfoBox>
              <InfoHeader>
                <div className="place">
                  <p>서울시 마포구</p>
                </div>

                <div className="time">
                  <p>2021.10.31 오후 3:58</p>
                </div>

                <ul className="starInfo">
                  <li>
                    <div>
                      <div className="starView">
                        <img src={ic_star} alt="star icon" />
                      </div>
                      <div>관측지수</div>
                      <div className="number1">10</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="moonRise">
                        <img src={ic_moonrise} alt="moonrise icon" />
                      </div>
                      <div>월출</div>
                      <div className="number2">16:00</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className="moonSet">
                        <img src={ic_moonset} alt="moonset icon" />
                      </div>
                      <div>월몰</div>
                      <div className="number3">6:00</div>
                    </div>
                  </li>
                </ul>

                <div className="headerLine"></div>
                {/*line*/}
              </InfoHeader>
              <InfoBody>
                <ul className="hour">
                  <li>
                    <div>
                      <p>시간</p>
                    </div>
                  </li>
                  <li>
                    <div>16:00</div>
                  </li>
                  <li>
                    <div>17:00</div>
                  </li>
                  <li>
                    <div>18:00</div>
                  </li>
                  <li>
                    <div>19:00</div>
                  </li>
                </ul>

                <ul className="weather">
                  <li>
                    <div>
                      <p>날씨</p>
                    </div>
                  </li>
                  <li>
                    <div className="sunnyView">
                      <img src={ic_sunny} alt="sun icon" />
                    </div>
                  </li>
                  <li>
                    <div className="sunnyView">
                      <img src={ic_sunny} alt="sun icon" />
                    </div>
                  </li>
                  <li>
                    <div className="sunnyView">
                      <img src={ic_sunny} alt="sun icon" />
                    </div>
                  </li>
                  <li>
                    <div className="sunnyView">
                      <img src={ic_sunny} alt="sun icon" />
                    </div>
                  </li>
                </ul>

                <ul className="temp">
                  <li>
                    <div>
                      <p>온도</p>
                    </div>
                  </li>
                  <li>
                    <div>10°</div>
                  </li>
                  <li>
                    <div>10°</div>
                  </li>
                  <li>
                    <div>10°</div>
                  </li>
                  <li>
                    <div>10°</div>
                  </li>
                </ul>

                <ul className="rainpro">
                  <li>
                    <div>
                      <p>강수확률</p>
                    </div>
                  </li>
                  <li>
                    <div>100%</div>
                  </li>
                  <li>
                    <div>100%</div>
                  </li>
                  <li>
                    <div>100%</div>
                  </li>
                  <li>
                    <div>100%</div>
                  </li>
                </ul>

                <ul className="humidity">
                  <li>
                    <div>
                      <p>습도</p>
                    </div>
                  </li>
                  <li>
                    <div>0%</div>
                  </li>
                  <li>
                    <div>0%</div>
                  </li>
                  <li>
                    <div>0%</div>
                  </li>
                  <li>
                    <div>0%</div>
                  </li>
                </ul>

                <ul className="cloud">
                  <li>
                    <div>
                      <p>구름양</p>
                    </div>
                  </li>
                  <li>
                    <div>많음</div>
                  </li>
                  <li>
                    <div>많음</div>
                  </li>
                  <li>
                    <div>많음</div>
                  </li>
                  <li>
                    <div>많음</div>
                  </li>
                </ul>

                <ul className="dust">
                  <li>
                    <div>
                      <p>미세먼지</p>
                    </div>
                  </li>
                  <li>
                    <div>11㎍/㎥</div>
                  </li>
                  <li>
                    <div>11㎍/㎥</div>
                  </li>
                  <li>
                    <div>11㎍/㎥</div>
                  </li>
                  <li>
                    <div>11㎍/㎥</div>
                  </li>
                </ul>
              </InfoBody>
            </InfoBox>
          </div>
          <ResultBox>
            <ResultHeader>
              <div className="title">
                <h3>가깝고 멍때리기 좋은 서울 노을 캠핑장</h3>
              </div>

              <div className="date">
                <p>2021.10.31 작성</p>
              </div>

              <ul className="likeInfo">
                <li>
                  <div>
                    <FaRegHeart />
                    &nbsp;&nbsp;189
                  </div>
                </li>
                <li>
                  <div className="bookmark">
                    <FaRegBookmark />
                  </div>
                </li>
              </ul>

              <div className="nickName">
                <div className="profileIcon">
                  <img src={ic_mypage} alt="profile icon" />
                </div>
                <p>홍길동</p>
              </div>

              <div className="headerLine2"></div>
              {/*line*/}
            </ResultHeader>
            <ResultBody>
              <div className="campInfo">
                <br />
                <br />
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_1280.jpg"
                  alt="camp"
                />
              </div>
              <div className="campInfodes">
                <p>
                  어쩌구캠핑장은 쾌적한 자연환경과 더불어 남사당 공연, 별자리
                  체험 등 다양한 볼거리와 체험거리가 공존해 있는 최상의
                  공간입니다. 답답한 도시에서 벗어나 다양한 체험을 경험하며
                  힐링해보세요!
                </p>
              </div>
              <div className="headerLine3"></div>
              {/*line*/}
              <div class="buttons">
                {is_login ? (
                  ((
                    <button
                      onClick={() => {
                        history.push("/post/edit/:id");
                      }}
                    >
                      수정
                    </button>
                  ),
                  (<button onClick={Delete}>삭제</button>))
                ) : (
                  <button />
                )}
              </div>
            </ResultBody>
          </ResultBox>
        </StyledBox>
      </div>
    </React.Fragment>
  );
};

const MapBox = styled.section`
  position: relative;
  width: 26%;
  height: 38%;
  overflow: hidden;
  border-radius: 10px;
`;

const InfoBox = styled.section`
  width: 312px;
  height: 380px;
  margin-top: 20px;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  background-color: #303136;
  overflow: auto;
  -ms-overflow-style: none;
`;

const InfoHeader = styled.div`
  justify-content: space-between;

  .place {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    vertical-align: top;
    width: 138px;
    margin: 36px 0 0 36px;
  }

  .time {
    font-size: 12px;
    width: 114px;
    height: 16px;
    line-height: 16px;
    text-align: left;
    color: #dddddd;
    margin: 42px 36px 0 234px;
    padding-left: 36px;
    vertical-align: top;
  }

  .starInfo {
    position: relative;
    top: 20px;
    width: 90%;
    display: flex;
    margin: auto;
    margin-left: 23px;
  }
  .starInfo > li {
    flex: 1;
    height: 70px;
  }
  .starInfo > li > div {
    text-align: center;

    margin-top: -3px;
    height: 50px;
    font-size: 11px;
    color: #ffffff;
  }

  .starInfo > li > div > .starView > img {
    width: 13.5px;
    height: 13px;
    margin: -15px;
    margin-left: -73px;
  }

  .starInfo > li > div > .moonRise > img {
    width: 13.5px;
    height: 13px;
    margin: -15px;
    margin-left: -50px;
  }

  .starInfo > li > div > .moonSet > img {
    width: 13.5px;
    height: 13px;
    margin: -15px;
    margin-left: -50px;
  }

  .starInfo > li > div > .number1 {
    margin: 12px;
    margin-left: 6px;
    font-size: 17px;
    font-weight: bold;
  }

  .starInfo > li > div > .number2 {
    margin: 12px;
    margin-left: 2px;
    font-size: 17px;
    font-weight: bold;
  }

  .starInfo > li > div > .number3 {
    margin: 12px;
    margin-left: 1px;
    font-size: 17px;
    font-weight: bold;
  }

  .headerLine {
    width: 248px;
    border-style: solid;
    border-width: 0.5px;
    margin-top: 28px;
    margin-left: 31.5px;
    color: #666666;
  }
`;

const InfoBody = styled.div`
  justify-content: space-between;
  padding: 5px;
  .hour {
    font-size: 12px;
    position: relative;
    top: 21px;
    width: 87%;
    display: flex;
    margin: auto;
    margin-left: 18px;
  }
  .hour > li {
    flex: 1;
  }
  .hour > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
    color: #cccccc;
  }
  .hour > li > div > p {
    color: #eeeeee;
    margin-left: -2px;
  }

  .weather {
    font-size: 5px;
    position: relative;
    top: 30px;
    width: 87%;
    display: flex;
    margin: auto;
    margin-left: 18px;
  }
  .weather > li {
    flex: 1;
  }
  .weather > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
  }
  .weather > li > div > p {
    color: #eeeeee;
    margin-left: -4px;
  }

  .weather > li > div > img {
    width: 16x;
    height: 16px;
    margin-left: 3px;
  }

  .temp {
    font-size: 5px;
    position: relative;
    top: 39px;
    width: 88%;
    display: flex;
    margin: auto;
    margin-left: 18px;
  }
  .temp > li {
    flex: 1;
  }
  .temp > li > div {
    text-align: center;
    margin-top: 5px;

    height: 19px;
    color: #cccccc;
    font-weight: bold;
  }

  .temp > li > div > p {
    color: #eeeeee;
    font-weight: normal;
    margin-left: -6px;
  }

  .rainpro {
    font-size: 5px;
    position: relative;
    top: 47px;
    width: 87%;
    display: flex;
    margin: auto;
    margin-left: 19px;
  }
  .rainpro > li {
    flex: 1;
  }
  .rainpro > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
    color: #cccccc;
    font-weight: bold;
  }
  .rainpro > li > div > p {
    color: #eeeeee;
    font-weight: normal;
    margin-left: 10px;
  }

  .humidity {
    font-size: 5px;
    position: relative;
    top: 54px;
    width: 87%;
    display: flex;
    margin: auto;
    margin-left: 15px;
  }
  .humidity > li {
    flex: 1;
  }
  .humidity > li > div {
    text-align: center;
    margin-top: 5px;
    margin-left: 7px;
    height: 19px;
    color: #cccccc;
    font-weight: bold;
  }
  .humidity > li > div > p {
    color: #eeeeee;
    margin-left: -8px;
    font-weight: normal;
  }

  .cloud {
    font-size: 5px;
    position: relative;
    top: 63px;
    width: 87%;
    display: flex;
    margin: auto;
    margin-left: 17px;
  }
  .cloud > li {
    flex: 1;
  }
  .cloud > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
    color: #cccccc;
  }
  .cloud > li > div > p {
    color: #eeeeee;
    margin-left: 2px;
    font-weight: normal;
  }

  .dust {
    font-size: 5px;
    position: relative;
    top: 71px;
    width: 85%;
    display: flex;
    margin: auto;
    margin-left: 16px;
  }
  .dust > li {
    flex: 1;
  }
  .dust > li > div {
    text-align: center;
    margin-top: 5px;
    margin-left: 12px;
    height: 19px;
    color: #cccccc;
    font-weight: bold;
  }
  .dust > li > div > p {
    color: #eeeeee;
    font-weight: normal;
    margin-left: 2px;
  }
`;

const StyledBox = styled.main`
  gap: 24px;
  height: 708px;

  & > section {
    border-radius: 10px;
    height: 97.8%;
    background-color: #303136;
    display: flex;
  }
`;

const ResultBox = styled.section`
  width: 72.3%;
  padding: 36px 28px 0;
  margin: -692px 0 0 333px;
  flex-direction: column;
`;

const ResultHeader = styled.div`
  justify-content: space-between;

  .title {
    h3 {
      font-weight: bold;
      font-size: 16px;
      line-height: 18px;
    }
  }

  .date {
    font-size: 12px;
    margin: -12px 0 0 285px;
    color: #999999;
  }

  .likeInfo {
    font-size: 15px;
    position: relative;
    top: 20px;
    width: 13%;
    display: flex;
    margin: -35px 0 0 728px;
  }
  .likeInfo > li {
    flex: 1;
  }
  .likeInfo > li > div {
    text-align: right;
    height: 19px;
  }
  .likeInfo > li > .bookmark {
    margin: 1px 25px 0 0;
  }

  .nickName {
    display: flex;
    height: 40px;
    flex-direction: column;
    justify-content: space-between;

    .profileIcon > img {
      margin: 30px 0 0 2px;
      width: 20px;
      height: 20px;
    }

    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #eeeeee;
      margin: -22px 0 0 29px;
    }
  }
  .headerLine2 {
    width: 99.9%;
    border-style: solid;
    border-width: 0.5px;
    color: #666666;
    margin: 26px 0 0 -2.5px;
  }
`;

const ResultBody = styled.ul`
  margin-top: 4px;

  img {
    width: 450px;
    height: 260px;
    object-fit: cover;
    margin-top: -15px;
  }

  p {
    width: 450px;
    margin-top: 21px;
    line-height: 24px;
    text-align: justify;
    font-size: 15px;
  }

  .headerLine3 {
    width: 99.9%;
    border-style: solid;
    border-width: 0.5px;
    margin: 118px 0 0 -2.5px;

    color: #666666;
  }

  .buttons {
    width: 300px;
    margin: 17px 0 0 652px;

    button {
      width: 72px;
      height: 36px;
      background: #18191e;
      font-size: 14px;
      color: #cccccc;
      border-radius: 4px;
      border: 0;
      margin: 4.1px;
    }
  }
`;

export default Detail;
