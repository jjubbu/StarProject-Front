import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// https://github.com/JaeSeoKim/react-kakao-maps-sdk
import ic_star from "../img/main-star/ic_star.svg";
import { history } from "../redux/configureStore";

const Delete = () => {};

const MainCommunity = () => {
  const testSearchArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [text, setText] = React.useState("지금 내 위치!");
  const [latitude, setLatitude] = React.useState(37);
  const [longitude, setLongitude] = React.useState(121);
  const [hour, setHour] = React.useState();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (x) => {
    const position = x.coords;
    const latitude = position.latitude;
    const longitude = position.longitude;
    // setText(position)
    console.log("위도 :::", latitude);
    console.log("경도 :::", longitude);

    setLatitude(latitude);
    setLongitude(longitude);
  };

  const error = (x) => {
    setText(x.code + ":::" + x.message);
  };

  //지도 구현함수
  const userLocation = () => {
    console.log("clcik!");
    if ("geolocation" in navigator) {
      /* 위치정보 사용 가능 */
      console.log("useEffect");
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      /* 위치정보 사용 불가능 */
      console.log("error");
    }
  };
  React.useEffect(() => {
    userLocation();
  });
  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <StyledMap>
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
          <MapBox>
            <Map
              center={{ lat: latitude, lng: longitude }}
              style={{ width: "100%", height: "792px" }}
            >
              <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>Hello World!</div>
              </MapMarker>
            </Map>
          </MapBox>
        </StyledMap>
      </div>
    </React.Fragment>
  );
};
const StyledMap = styled.main`
  display: flex;
  gap: 24px;
  height: 792px;

  & > section {
    border-radius: 10px;
    height: 100%;
    background-color: #303136;
  }
`;

const MapBox = styled.section`
  position: relative;
  width: 66%;
  overflow: hidden;
`;

const ResultBox = styled.section`
  width: 32%;
  padding: 36px 28px 0;
  display: flex;
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

export default MainCommunity;
