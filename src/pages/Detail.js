import React from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ic_sunny from "../img/ic_sunny.svg";
import { history } from "../redux/configureStore";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegGrin } from "react-icons/fa";

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
                      <div>관측지수</div>
                      <div>10</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div>월출</div>
                      <div>16:00</div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div>월몰</div>
                      <div>6:00</div>
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
                <h3>
                  <FaRegGrin />
                </h3>
                <p>서울특별시 어쩌구</p>
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
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    vertical-align: top;
    width: 138px;
    margin: 20px;
    background-color: green;
  }

  .time {
    font-size: 12px;
    background-color: green;
    width: 120px;
    height: 16px;
    line-height: 16px;
    text-align: left;
    color: #dddddd;
    margin: -38px 0 0 190px;
  }

  .starInfo {
    position: relative;
    top: 20px;
    width: 60%;
    display: flex;
    margin: auto;
  }
  .starInfo > li {
    flex: 1;
    height: 70px;
  }
  .starInfo > li > div {
    text-align: center;
    background-color: green;
    margin-top: 10px;
    height: 40px;
  }

  .headerLine {
    width: 240px;
    border-style: solid;
    border-width: 0.5px;
    margin-top: 13px;
    margin-left: 35px;
    color: #666666;
  }
`;

const InfoBody = styled.div`
  justify-content: space-between;

  .hour {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 60%;
    display: flex;
    margin: auto;
  }
  .hour > li {
    flex: 1;
  }
  .hour > li > div {
    text-align: center;
    background-color: red;
    margin-top: 5px;
    height: 19px;
  }
  .hour > li > div > p {
    color: #eeeeee;
  }

  .weather {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 60%;
    display: flex;
    margin: auto;
  }
  .weather > li {
    flex: 1;
  }
  .weather > li > div {
    text-align: center;
    background-color: Indigo;
    margin-top: 5px;
    height: 19px;
  }
  .weather > li > div > img {
    width: 16x;
    height: 16px;
  }

  .temp {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 60%;
    display: flex;
    margin: auto;
  }
  .temp > li {
    flex: 1;
  }
  .temp > li > div {
    text-align: center;
    background-color: blue;
    margin-top: 5px;
    height: 19px;
  }
  .temp > li > div > p {
    color: #eeeeee;
  }

  .rainpro {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 75%;
    display: flex;
    margin: auto;
  }
  .rainpro > li {
    flex: 1;
  }
  .rainpro > li > div {
    text-align: center;
    background-color: green;
    margin-top: 5px;
    height: 19px;
  }
  .rainpro > li > div > p {
    color: #eeeeee;
  }

  .humidity {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 60%;
    display: flex;
    margin: auto;
  }
  .humidity > li {
    flex: 1;
  }
  .humidity > li > div {
    text-align: center;
    background-color: orange;
    margin-top: 5px;
    height: 19px;
  }
  .humidity > li > div > p {
    color: #eeeeee;
  }

  .cloud {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 60%;
    display: flex;
    margin: auto;
  }
  .cloud > li {
    flex: 1;
  }
  .cloud > li > div {
    text-align: center;
    background-color: purple;
    margin-top: 5px;
    height: 19px;
  }
  .cloud > li > div > p {
    color: #eeeeee;
  }

  .dust {
    font-size: 12px;
    position: relative;
    top: 20px;
    width: 80%;
    display: flex;
    margin: auto;
  }
  .dust > li {
    flex: 1;
  }
  .dust > li > div {
    text-align: center;
    background-color: red;
    margin-top: 5px;
    height: 19px;
  }
  .dust > li > div > p {
    color: #eeeeee;
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
    font-size: 15px;
    margin: -15px 0 0 285px;
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

    h3 {
      margin-top: 30px;
    }

    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #eeeeee;
      margin-top: -23px;
      margin-left: 28px;
    }
  }
  .headerLine2 {
    width: 99.9%;
    border-style: solid;
    border-width: 0.5px;
    margin-top: 26px;
    margin-left: -2.5px;
    color: #666666;
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
