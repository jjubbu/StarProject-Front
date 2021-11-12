import React from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ic_sunny from "../img/ic_sunny.svg";
import ic_star from "../img/ic_star.svg";
import ic_moonrise from "../img/ic_moonrise.svg";
import ic_moonset from "../img/ic_moonset.svg";
import ic_mypage from "../img/ic_mypage.svg";
import { history } from "../redux/configureStore";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const Detail = () => {
  React.useEffect(() => {
    console.log(window.location.pathname);
  }, []);

  const Delete = () => {};
  //지도 구현함수
  return (
    <React.Fragment>
      <div className="CommonPageStyle">
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
                    <div>흐림</div>
                  </li>
                  <li>
                    <div>비옴</div>
                  </li>
                  <li>
                    <div>맑음</div>
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

                <div class="headerButton">
                  {/*날씨 더보기페이지*/}
                  <button
                    onClick={() => {
                      history.push({
                        /*"/card/write"*/
                      });
                    }}
                  >
                    날씨 더보기
                  </button>
                </div>
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
                  <div>
                    <FaRegBookmark />
                    &nbsp;&nbsp;40
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
                <button onClick={Delete}>삭제</button>

                {/*내가 글을 작성 중이던 페이지로*/}
                <button
                  onClick={() => {
                    history.push("/card/write");
                  }}
                >
                  수정
                </button>
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
  width: 26%;
  height: 401px;
  margin-top: 20px;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  background-color: #303136;
`;

const InfoHeader = styled.div`
  justify-content: space-between;

  .place {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    vertical-align: top;
    width: 138px;
    margin: 22px;
    margin-left: 20px;
  }

  .time {
    font-size: 10.5px;
    width: 120px;
    height: 16px;
    line-height: 16px;
    text-align: left;
    color: #dddddd;
    margin: -44px 0 0 194px;
    Vertical align: Top;
  }

  .starInfo {
    position: relative;
    top: 20px;
    width: 100%;
    display: flex;
    margin: auto;
    margin-left: 8px;
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
    color: #FFFFFF;
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
    margin: 5px;
    margin-left: 1px;
    font-size: 17px;
    font-weight: bold;
  }

  .starInfo > li > div > .number2 {
    margin: 5px;
    margin-left: -5px;
    font-size: 17px;
    font-weight: bold;
  }

  .starInfo > li > div > .number3 {
    margin: 5px;
    margin-left: -8px;
    font-size: 17px;
    font-weight: bold;
  }
  

  .headerLine {
    width: 272px;
    border-style: solid;
    border-width: 0.5px;
    margin-top: 11px;
    margin-left: 20px;
    color: #666666;
  }
`;

const InfoBody = styled.div`
  justify-content: space-between;

  .hour {
    font-size: 11.5px;
    position: relative;
    top: 12px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1px;
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
  }

  .weather {
    font-size: 11.5px;
    position: relative;
    top: 21px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1px;
  }
  .weather > li {
    flex: 1;
  }
  .weather > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
    color: #cccccc;
  }
  .weather > li > div > img {
    width: 16x;
    height: 16px;
  }

  .temp {
    font-size: 11.5px;
    position: relative;
    top: 29px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1px;
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
  }

  .rainpro {
    font-size: 11.5px;
    position: relative;
    top: 36px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1.5px;
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
  }

  .humidity {
    font-size: 11.5px;
    position: relative;
    top: 43px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1px;
  }
  .humidity > li {
    flex: 1;
  }
  .humidity > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
    color: #cccccc;
    font-weight: bold;
  }
  .humidity > li > div > p {
    color: #eeeeee;
    font-weight: normal;
  }

  .cloud {
    font-size: 11.5px;
    position: relative;
    top: 51px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1px;
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
    font-weight: normal;
  }

  .dust {
    font-size: 11.5px;
    position: relative;
    top: 59px;
    width: 98%;
    display: flex;
    margin: auto;
    margin-left: 1.5px;
  }
  .dust > li {
    flex: 1;
  }
  .dust > li > div {
    text-align: center;
    margin-top: 5px;
    height: 19px;
    color: #cccccc;
    font-weight: bold;
  }
  .dust > li > div > p {
    color: #eeeeee;
    font-weight: normal;
  }

  .headerButton {
    margin-top: 71px;
    margin-left: 21.5px;
    button {
      width: 270px;
      height: 30px;
      background: #18191e;
      font-size: 12.5px;
      color: #cccccc;
      border-radius: 20px;
    }
  }
`;

const StyledBox = styled.main`
  gap: 24px;
  height: 708px;

  & > section {
    border-radius: 10px;
    height: 101%;
    background-color: #303136;
    display: flex;
  }
`;

const ResultBox = styled.section`
  width: 72.3%;
  padding: 36px 28px 0;
  margin: -713px 0 0 333px;
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
    font-size: 14px;
    position: relative;
    top: 20px;
    width: 13%;
    display: flex;
    margin: -35px 0 0 700px;
  }
  .likeInfo > li {
    flex: 1;
  }
  .likeInfo > li > div {
    text-align: right;
    height: 19px;
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
    margin: 140px 0 0 -2.5px;

    color: #666666;
  }

  .buttons {
    width: 300px;
    margin: 19px 0 0 660px;

    button {
      width: 72px;
      height: 36px;
      background: #18191e;
      font-size: 14px;
      color: #cccccc;
      border-radius: 4px;
      margin: 2.5px;
    }
  }
`;

export default Detail;
