import React from "react";
import styled, { keyframes } from "styled-components";

import HelmetComp from "../components/HelmetComp";
import ic_sunny from "../img/weather/ic_sunny.svg"; //맑음
import ic_cloudy from "../img/weather/ic_cloudy.svg"; //구름많음
import ic_overcast from "../img/weather/ic_overcast.svg"; //흐림
import ic_finedust1 from "../img/weather/ic_finedust_1.svg";
import ic_finedust2 from "../img/weather/ic_finedust_2.svg";
import ic_finedust3 from "../img/weather/ic_finedust_3.svg";
import ic_finedust4 from "../img/weather/ic_finedust_4.svg";
import ic_umbrella from "../img/weather/ic_umbrella.svg";
import ic_humidity from "../img/weather/ic_humidity.svg";
import ic_moonrise from "../img/moon/ic_moonrise.svg";
import ic_moonset from "../img/moon/ic_moonset.svg";
import ic_star from "../img/ic_star.svg";
import ic_map from "../img/map/ic_map.svg";
import ic_location_off from "../img/map/ic_location_off.svg";
import ic_location_on from "../img/map/ic_location_on.svg";

import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { actionCreators as starAction } from "../redux/modules/star";
import { actionCreators as starUserAction } from "../redux/modules/user";

const MainStar = () => {
  const star_photo = useSelector((state) => state.star.star_photo);
  const star_notice = useSelector((state) => state.star.star_notice);
  const star_weather = useSelector((state) => state.star.star_weather);
  const star_hot = useSelector((state) => state.star.star_hot);
  const is_loading = useSelector((state) => state.star.loading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(textLogo(false));
    dispatch(starUserAction.userLocationMW("star"));
    dispatch(starAction.starHotMW());
    dispatch(starAction.starPhotoMW());
  }, [dispatch]);

  const liArray = Array.from(new Array(11).keys());

  const locationButton = () => {
    dispatch(starUserAction.userLocationMW("star"));
  };

  return (
    <React.Fragment>
      <HelmetComp title="별자리" url="https://stellakorea.co.kr/star" />
      <div className="CommonPageStyle CommonGap">
        <StyledStar>
          <div>
            <LocationBox
              className="contentsBox"
              id={is_loading.weather ? "isLoading" : ""}
            >
              {is_loading.weather ? <span className="loader" /> : null}

              <img src={ic_map} alt="map icon" />
              <h3>{star_weather?.cityName}</h3>
              <button onClick={locationButton}>
                <img
                  src={ic_location_off}
                  alt="your location button"
                  className="location"
                  onClick={locationButton}
                />
                <img
                  src={ic_location_on}
                  alt="your location button"
                  className="location_on"
                  onClick={locationButton}
                />
              </button>
              <span className="buttonHover">현재위치</span>
            </LocationBox>
            <WeatherBox
              className="contentsBox"
              id={is_loading.weather ? "isLoading" : ""}
            >
              {is_loading.weather ? <span className="loader" /> : null}

              <WeatherTemperature>
                <div>
                  <img
                    src={
                      star_weather?.weather === "맑음"
                        ? ic_sunny
                        : star_weather?.weather === "흐림"
                        ? ic_overcast
                        : star_weather?.weather === "구름 조금 많음"
                        ? ic_cloudy
                        : null
                    }
                    alt="weather logo"
                  />
                  <div className="temperature">
                    <h3 className="openSans">
                      {star_weather?.temperature}
                      <span>°C</span>
                    </h3>
                    <p>
                      {star_weather?.minTemperature}° /{" "}
                      {star_weather?.maxTemperature}°
                    </p>
                  </div>
                </div>
                <p className="comment">{star_weather?.weather}</p>
              </WeatherTemperature>
              <span className="line" />
              <WeatherETC>
                <section>
                  <h3>미세먼지</h3>
                  <img
                    src={
                      star_weather?.dust <= 30
                        ? ic_finedust1
                        : (star_weather?.dust > 30 && star_weather?.dust) <= 80
                        ? ic_finedust2
                        : (star_weather?.dust > 80 && star_weather?.dust) <= 150
                        ? ic_finedust3
                        : ic_finedust4
                    }
                    alt="finedust icon"
                  />
                  <p className="openSans">{star_weather?.dust}</p>
                </section>
                <section>
                  <h3>강수확률</h3>
                  <img src={ic_umbrella} alt="ultra finedust icon" />
                  <p className="openSans">
                    {star_weather?.rainPercent}
                    <span>%</span>
                  </p>
                </section>
                <section>
                  <h3>습도</h3>
                  <img src={ic_humidity} alt="humidity icon" />
                  <p className="openSans">
                    {star_weather?.humidity}
                    <span>%</span>
                  </p>
                </section>
              </WeatherETC>
            </WeatherBox>
            <VisiblityBox
              className="contentsBox"
              visiblity={star_notice.starGazing}
              id={is_loading.notice ? "isLoading" : ""}
            >
              {is_loading.notice ? <span className="loader" /> : null}

              <div className="title">
                <img src={ic_star} alt="star icon" />
                <h3>관측지수</h3>
                <p>별보기 좋은날 :)</p>
              </div>
              <div className="bar">
                <div>
                  <span />
                </div>
                <ul>
                  {liArray.map((l, idx) => {
                    return (
                      <li key={idx} className="openSans">
                        {l}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </VisiblityBox>
            <MoonBox>
              <section
                className="contentsBox"
                id={is_loading.notice ? "isLoading" : ""}
              >
                {is_loading.notice ? <span className="loader" /> : null}

                <h3>
                  <img src={ic_moonrise} alt="moon icon" />
                  월출
                </h3>
                <p className="openSans">{star_notice?.moonrise}</p>
              </section>
              <section
                className="contentsBox"
                id={is_loading.notice ? "isLoading" : ""}
              >
                {is_loading.notice ? <span className="loader" /> : null}

                <h3>
                  <img src={ic_moonset} alt="moon icon" />
                  월몰
                </h3>
                <p className="openSans">{star_notice?.moonset}</p>
              </section>
            </MoonBox>
          </div>
          <div>
            <ImageBox
              className="contentsBox"
              id={is_loading.photo ? "isLoading" : ""}
            >
              {is_loading.photo ? <span className="loader" /> : null}

              <button>
                <span className="buttonHover">별자리 설명</span>
                <section className="buttonActive">
                  <h3>{star_photo?.starName}</h3>
                  <p>{star_photo?.comment}</p>
                </section>
                ?
              </button>
              <img src={star_photo?.starImg} alt="star" />
            </ImageBox>
            <RecommendBox
              className="contentsBox"
              id={is_loading.hot ? "isLoading" : ""}
            >
              {is_loading.hot ? <span className="loader" /> : null}

              <div>
                <h3>실시간 별보기 좋은 지역</h3>
                <p className="openSans">{star_hot?.currentTime} 기준</p>
              </div>
              <span className="line" />
              <ul>
                {star_hot?.starList.map((l, idx) => {
                  return (
                    <li key={idx}>
                      <img src={l.img} alt="star" />
                      <div>
                        <h3>{l.cityName}</h3>
                        <p>
                          관측지수{" "}
                          <span className="openSans">{l.starGazing}</span>
                        </p>
                        <p>
                          <span className="openSans">{l.temperature}°</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </RecommendBox>
          </div>
        </StyledStar>
      </div>
    </React.Fragment>
  );
};

const loading = keyframes`
 0%{
    transform: translate3d(-100%, 0, 0);
  }
 100%{
    transform: translate3d(100%, 0, 0);
  }
`;

const StyledStar = styled.main`
  display: flex;
  gap: 24px;
  #isLoading {
    padding: 0;
    width: 100%;
    overflow: hidden;
    *:not(.loader) {
      display: none;
    }
  }
  .loader {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 35%,
      rgba(255, 255, 255, 0.05) 40%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.05) 60%,
      rgba(0, 0, 0, 0) 65%
    );
    opacity: 0.1;
    animation: ${loading} infinite 1s;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > div:first-child {
    width: 32%;
  }
  & > div:last-child {
    width: 66%;
  }

  .contentsBox {
    background: #303136;
    border-radius: 10px;
    width: 100%;
  }
`;

const LocationBox = styled.section`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 68px;
  position: relative;

  h3 {
    width: 100%;
    margin-left: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
  }
  button {
    width: 24px;
    height: 24px;
    background: none;
    border: none;
  }
  .location_on {
    display: none;
  }
  .location,
  .location_on {
    cursor: pointer;
  }
  .buttonHover {
    display: none;
  }
  .location:hover ~ .buttonHover {
    display: block;
    position: absolute;
    padding: 5px 7px;
    background-color: #000;
    font-size: 12px;
    line-height: 15px;
    border-radius: 4px;
    right: 8px;
    top: -10px;
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 14px;
      border-top: 7px solid #000;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 7px solid transparent;
      box-sizing: border-box;
      bottom: -14px;
      right: 50%;
      margin-right: -4px;
    }
  }
  .location:active {
    display: none;
  }
  .location:active ~ .location_on {
    display: block;
  }
`;
const WeatherBox = styled.div`
  height: 404px;

  .line {
    width: 100%;
    padding: 0 24px;
    height: 1px;
    display: block;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #545454;
    }
  }
`;

const WeatherTemperature = styled.section`
  padding: 40px 0;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -5px;
    gap: 12px;
  }

  .temperature {
    h3 {
      font-size: 52px;
      font-weight: 700;
      width: fit-content;
      height: 71px;
      line-height: 71px;
      text-align: right;
      position: relative;
      span {
        font-size: 28px;
        font-weight: 400;
        position: absolute;
        top: 11px;
        right: -32px;
        width: 30px;
        height: 38px;
        line-height: 38px;
      }
    }
    p {
      font-size: 16px;
      margin-left: 8px;
    }
  }
  .comment {
    font-size: 18px;
    text-align: center;
    margin-top: 16px;
  }
`;

const WeatherETC = styled.div`
  display: flex;
  width: fit-content;
  gap: 60px;
  margin: 0 auto;
  padding: 40px 0;
  section {
    text-align: center;
    h3 {
      font-size: 14px;
      font-weight: 400;
    }
    img {
      margin: 8px 0;
    }
    p {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 27px;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      gap: 2px;
      span {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        margin-top: 4px;
        display: block;
      }
    }
  }
`;

const VisiblityBox = styled.section`
  height: 146px;
  padding: 32px 0;
  .title {
    display: flex;
    align-items: center;
    margin-left: 16.5%;
    h3 {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: #efefef;
      margin-left: 4px;
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #999999;
      margin-left: 12px;
    }
  }
  .bar {
    margin: 22px auto 0;
    & > div {
      width: 67%;
      height: 12px;
      background: white;
      border-radius: 6px;
      overflow: hidden;
      margin: 0 auto;
      span {
        display: block;
        width: ${(props) => props.visiblity * 10}%;
        height: 12px;
        background-color: #418dff;
      }
    }
  }
  ul {
    display: flex;
    width: 70%;
    justify-content: space-between;
    margin: 8px auto 0;
    li {
      font-size: 12px;
      color: #999999;
    }
    li:nth-child(${(props) => Number(props.visiblity) + 1}) {
      color: white;
      font-weight: bold;
    }
  }
`;
const MoonBox = styled.div`
  display: flex;
  gap: 20px;
  & > section {
    width: 100%;
    height: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  img {
    margin-right: 5px;
  }
  h3 {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
  }
  p {
    font-size: 36px;
    margin-top: 12px;
    font-weight: 700;
  }
`;

const ImageBox = styled.div`
  height: 594px;
  overflow: hidden;
  position: relative;
  button {
    position: absolute;
    bottom: 28px;
    right: 28px;
    width: 48px;
    height: 48px;
    background: #000;
    border-radius: 100%;
    font-size: 24px;
    line-height: 33px;
    border: none;
    color: white;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .buttonHover,
  .buttonActive {
    display: none;
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 14px;
      border-top: 7px solid rgba(0, 0, 0, 0.7);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 7px solid transparent;
      box-sizing: border-box;
      bottom: -14px;
    }
  }
  .buttonHover {
    width: 72px;
    padding: 5px 7px;
    font-size: 12px;
    line-height: 15px;
    border-radius: 4px;
    right: -11px;
    top: -36px;
    &::after {
      right: 50%;
      margin-right: -4px;
    }
  }
  .buttonActive {
    width: 480px;
    padding: 24px;
    border-radius: 11px;
    right: -12px;
    bottom: 57px;
    &::after {
      right: 32px;
    }
    h3 {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      line-height: 25px;
      margin-left: 8px;
    }
    p {
      margin-top: 9px;
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      text-align: left;
    }
  }
  button:hover .buttonHover,
  button:active .buttonActive {
    display: block;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
  }
  button:active .buttonHover {
    display: none;
  }
`;
const RecommendBox = styled.section`
  height: 212px;
  padding: 32px;

  & > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    h3 {
      font-size: 18px;
      font-weight: normal;
    }
    p {
      font-size: 12px;
      line-height: 18px;
      color: #cccccc;
    }
  }

  ul {
    display: flex;
    width: 100%;
    max-width: 700px;
    justify-content: space-between;
    li {
      display: flex;
      gap: 16px;
      align-items: center;

      h3 {
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
      }
      p {
        font-size: 12px;
        line-height: 25px;
        span {
          font-size: 18px;
          font-weight: bold;
          vertical-align: middle;
        }
      }
      p:last-child {
        margin-top: 9px;
        line-height: 18px;
        span {
          font-weight: 400;
          font-size: 12px;
        }
      }
    }

    img {
      width: 88px;
      height: 88px;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  .line {
    display: block;
    border-top: 1px solid #666666;
    width: 100%;
    margin: 18px 0 24px;
  }
`;

export default MainStar;
