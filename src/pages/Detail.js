import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// https://github.com/JaeSeoKim/react-kakao-maps-sdk
import ic_star from "../img/ic_star.svg";
import ic_moonrise from "../img/ic_moonrise.svg";
import { history } from "../redux/configureStore";

const Detail = () => {
  React.useEffect(() => {
    console.log(window.location.pathname);
  }, []);

  const Delete = () => {};
  //지도 구현함수
  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <MapBox>
          <Map
            center={{ lat: 33.55635, lng: 126.795841 }}
            style={{ width: "100%", height: "792px" }}
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
                <div>dd</div>
              </li>
              <li>
                <div>dd</div>
              </li>
              <li>
                <div>dd</div>
              </li>
            </ul>
          </InfoHeader>
        </InfoBox>

        <StyledBox>
          {/*main*/}
          <ResultBox>
            <ResultHeader>
              <div className="nickname">
                <p>유저닉네임</p>
              </div>

              <div className="bookmark">
                <p>북마크</p>
              </div>

              <div className="title">
                <h3>어쩌구캠핑장</h3>
                <p>서울특별시 어쩌구</p>
              </div>

              <div className="sub">
                <p>#해시태그</p>
              </div>
              <div className="starView">
                <img src={ic_star} alt="star icon" />
              </div>
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
  width: 30%;
  height: 38%;
  overflow: hidden;
  border-radius: 10px;
`;

const InfoBox = styled.section`
  position: relative;
  width: 30%;
  height: 59%;
  margin-top: 25px;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  background-color: #303136;
`;

const InfoHeader = styled.div`
  justify-content: space-between;

  .place {
    font-size: 15px;
    background-color: red;
    width: 30%;
    margin: 30px;
  }

  .time {
    font-size: 15px;
    background-color: blue;
    width: 40%;
    margin: -45px 0 0 200px;
  }

  .starInfo {
    width: 40%;
    background-color: orange;
    display: flex;
  }
  .starInfo > li > div {
    text-align: center;
  }
`;

const StyledBox = styled.main`
  gap: 24px;
  height: 805px;

  & > section {
    border-radius: 10px;
    height: 100%;
    background-color: #303136;
  }
`;

const ResultBox = styled.section`
  width: 68%;
  padding: 36px 28px 0;
  display: flex;
  margin: -805px 0 0 385px;
  flex-direction: column;
`;

const ResultHeader = styled.div`
  justify-content: space-between;

  .nickname {
    font-size: 15px;
  }

  .bookmark {
    font-size: 15px;
    margin: -15px 0 0 285px;
  }

  .title {
    display: flex;
    height: 40px;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-weight: bold;
      font-size: 16px;
      line-height: 18px;
      margin-top: 49px;
    }
    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #eeeeee;
      margin-top: 6px;
    }
  }

  .sub {
    font-weight: normal;
    font-size: 14px;
    color: #eeeeee;
    margin-top: 35px;
    margin-left: 240px;
  }

  .starView {
    img {
      width: 16px;
      height: 50px;
      margin: -60px 0 0 310px;
    }
  }
`;

const ResultBody = styled.ul`
  margin-top: 4px;

  img {
    width: 330px;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
    margin-top: -35px;
  }

  p {
    width: 330px;
    margin-top: 18px;
    line-height: 24px;
    text-align: justify;
    font-size: 15px;
  }

  .buttons {
    width: 300px;
    margin: 134px 0 0 194px;

    button {
      width: 64px;
      height: 32px;
      background: #4688ec;
      color: white;
      border-radius: 5px;
      margin: 2.5px;
    }
  }
`;

export default Detail;
