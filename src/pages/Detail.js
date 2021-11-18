import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ic_star from "../img/ic_star.svg";
import ic_moonrise from "../img/ic_moonrise.svg";
import ic_moonset from "../img/ic_moonset.svg";
import ic_mypage from "../img/ic_mypage.svg";
import ic_sunny from "../img/weather/ic_sunny.svg";
import ic_heart from "../img/ic_heart.svg";
import ic_bookmark from "../img/ic_bookmark_off.svg";
import ic_arrow from "../img/ic_slideArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { actionCreators as loginCheckAction } from "../redux/modules/login";
import { apis } from "../lib/axios";

const Detail = ({ history, location, match }) => {
  const [data, setData] = useState({});
  const is_login = useSelector((state) => state.login.is_login);
  const weather = data.weather;
  const wList = weather.weatherList;
  const dispatch = useDispatch();

  React.useEffect(() => {
    // setData(getPostByID(id));
    dispatch(loginCheckAction.isLoginMW());
    const id = window.location.pathname.split("/")[2];
    apis.getPostDetailAX(id).then((response) => {
      console.log("post detail:::", response);
      if (response.data.code === 200) {
        setData(response.data.data);
      } else {
        alert(response.data.msg);
      }
    });
    dispatch(textLogo(false));
  }, []);

  //지도 구현함수
  return (
    <React.Fragment>
      <StyledDetail className="CommonPageStyle CommonGap">
        <div className="detailInfoETC">
          <MapBox>
            <Map
              center={{ lat: 33.55635, lng: 126.795841 }}
              style={{ width: "100%", height: "360px" }}
            >
              <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
            </Map>
          </MapBox>
          <WeatherInfoBox>
            <WeatherHeader>
              <h3>{weather.cityName}</h3>
              <p className="openSans">{weather.date}</p>
            </WeatherHeader>
            <WeaterInfoImport>
              <li>
                <h3>
                  <img src={ic_star} alt="star gazing icon" />
                  관측지수
                </h3>
                <p>{weather.starGazing}</p>
              </li>
              <li>
                <h3>
                  <img src={ic_moonrise} alt="star gazing icon" />
                  월출
                </h3>
                <p>
                  {weather.moonrise.slice(0, 2) +
                    ":" +
                    weather.moonrise.slice(2, 4)}
                </p>
              </li>
              <li>
                <h3>
                  <img src={ic_moonset} alt="star gazing icon" />
                  월몰
                </h3>
                <p>
                  {weather.moonset.slice(0, 2) +
                    ":" +
                    weather.moonset.slice(2, 4)}
                </p>
              </li>
            </WeaterInfoImport>
            <span className="line" />

            <WeatherTable>
              <button className="slidePrev">
                <img src={ic_arrow} alt="prev button" />
              </button>
              <button className="slideNext">
                <img src={ic_arrow} alt="next button" />
              </button>

              <tr className="tableHead">
                <th>시간</th>
                <th>날씨</th>
                <th>온도</th>
                <th>강수확률</th>
                <th>습도</th>
                <th>구름양</th>
                <th>미세먼지</th>
              </tr>
              <tbody>
                {wList?.map((l, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="openSans thinPlus">
                        {l.time.slice(0, 2) + ":" + l.time.slice(2, 4)}
                      </td>
                      <td>
                        <img src={ic_sunny} alt="weather" />
                      </td>
                      <td className="openSans temperature">{l.temperature}°</td>
                      <td className="openSans">
                        {l.rainPercent}
                        <span className="thinPlus">%</span>
                      </td>
                      <td className="openSans">
                        {l.humidity}
                        <span className="thinPlus">%</span>
                      </td>
                      <td className="thin">{l.weather}</td>
                      <td className="dust">
                        <p className="openSans">{l.dust}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </WeatherTable>
          </WeatherInfoBox>
        </div>
        <ContentBox>
          <ContentHeader>
            <div className="titleBox">
              <h3>타이틀</h3>
              <p className="openSans">2021.00.00 작성</p>
            </div>
            <div className="buttonBox">
              <button className="openSans">
                <img src={ic_heart} alt="like button" />
                10
              </button>
              <button>
                <img src={ic_bookmark} alt="bookmark button" />
              </button>
            </div>
          </ContentHeader>
          <ContentUser>
            <img src={ic_mypage} alt="user profile" />
            <h3 className="openSans">닉네임</h3>
          </ContentUser>
          <span className="line" />
          <section className="contents">컨텐츠</section>
          <span className="line" />

          <ContentFooter>
            {is_login ? (
              <React.Fragment>
                <button>수정</button>
                <button>삭제</button>
              </React.Fragment>
            ) : null}
          </ContentFooter>
        </ContentBox>
      </StyledDetail>
    </React.Fragment>
  );
};

const StyledDetail = styled.main`
  display: flex;
  width: 100%;
  gap: 24px;
  .detailInfoETC {
    width: 32%;
    height: fit-content;
  }
  .line {
    display: block;
    width: 100%;
    height: 1px;
    background: #666;
    margin-top: 20px;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 10px;
  overflow: hidden;
`;

const WeatherInfoBox = styled.section`
  width: 100%;
  height: 614px;
  background: #303136;
  border-radius: 10px;
  margin-top: 20px;
  padding: 36px 36px 56px;
`;

const WeatherHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
  }
  p {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #dddddd;
  }
`;

const WeaterInfoImport = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  li {
    display: flex;
    flex-direction: column;
    width: 33.33%;
    height: 88px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    h3 {
      display: flex;
      align-items: center;
      gap: 2.02px;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
    }
    p {
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
    }
  }
`;

const WeatherTable = styled.table`
  margin-top: 21px;
  display: flex;
  gap: 18px;
  position: relative;
  tr {
    display: block;
    width: fit-content;
  }
  tbody {
    display: flex;
    flex: 1;
    overflow: hidden;
    gap: 18px;
  }
  th,
  td {
    display: flex;
    align-items: center;
    height: 51px;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    gap: 2px;
    &.temperature {
      font-size: 20px;
      line-height: 27px;
    }
    &.dust p {
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background: #4688ec;
        border-radius: 3px;
        top: 0px;
        right: -8px;
      }
    }
    &.thin {
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
    }
    &.thinPlus,
    span.thinPlus {
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #cccccc;
    }
    span {
      margin-top: 2px;
    }
  }
  th {
    text-align: left;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    color: #eeeeee;
  }
  td {
    justify-content: center;

    img {
      width: 48px;
      height: 48px;
    }
  }

  .slidePrev,
  .slideNext {
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    margin-top: -12px;
  }
  .slidePrev {
    left: -34px;
  }
  .slideNext {
    right: -34px;
    transform: rotate(180deg);
  }
`;

const ContentBox = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #303136;
  border-radius: 10px;
  padding: 28px;

  .line {
    display: block;
    width: 100%;
    height: 1px solid #666;
    margin-top: 23px;
  }
  .contents {
    margin-top: 32px;
    flex: 1;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .titleBox {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
    h3 {
      font-weight: bold;
      font-size: 18px;
      line-height: 18px;
    }
    p {
      font-size: 12px;
      line-height: 18px;
      color: #999999;
    }
  }
  .buttonBox {
    display: flex;
    gap: 12px;
    margin-top: 7px;
    width: fit-content;
    height: 24px;
    button {
      height: 24px;
      background: none;
      border: none;
      color: white;
      display: flex;
      gap: 4px;
      align-items: center;
      font-size: 14px;
      line-height: 18px;
      color: #cccccc;
    }
  }
`;

const ContentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  h3 {
    font-size: 14px;
    line-height: 18px;
    color: #cccccc;
  }
`;

const ContentFooter = styled.div`
  height: 56px;
  display: flex;
  justify-content: right;
  align-items: flex-end;
  gap: 8px;
  button {
    background: #18191e;
    border-radius: 4px;
    border: none;
    height: 36px;
    padding: 0 23px;
    font-size: 14px;
    line-height: 18px;
    color: #cccccc;
  }
`;

export default Detail;
