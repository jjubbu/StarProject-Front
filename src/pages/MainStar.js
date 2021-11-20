import React from "react";
import styled from "styled-components";
import { apis } from "../lib/axios";

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

//임시 이미지
import image_sample from "../img/Rectangle 16.png";

import { useDispatch } from "react-redux";
import { textLogo } from "../redux/modules/header";

const MainStar = () => {
  const [text, setText] = React.useState("지금 내 위치!");
  const [userLocation, setUserLocation] = React.useState({});
  const [data, setData] = React.useState({
    moonrise: "...",
    moonset: " ...",
    starGazing: 0,
    location: "loading...",
    rainPercent: 0,
    humidity: 0,
    weather: "loading...",
    temperature: 0,
    maxTemperature: 0,
    minTemperature: 0,
    dust: 0,
  });
  const [hot, setHot] = React.useState([
    {
      cityName: "loading...",
      starGazing: 0,
      Temperature: 0,
    },
  ]);
  const [hotTime, setHotTime] = React.useState();
  const dispatch = useDispatch();

  const image =
    "https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg";

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (x) => {
    console.log("success");
    const position = x.coords;
    const latitude = position.latitude;
    const longitude = position.longitude;
    setUserLocation({ lat: latitude, lon: longitude });
    console.log("user location:::", userLocation);
  };

  const error = (x) => {
    setText(x.code + ":::" + x.message);
  };

  const weatherNow = () => {
    const date = new Date();
    let hour = Number(String(date.getHours()) + "00");
    console.log("hour:::", hour);
    apis
      .getNoticeWeatherAX(userLocation.lat, userLocation.lon, hour)
      .then((response) => {
        console.log("[AX] get notice weather:::", response);
        const resData = response.data.data;
        setData((prev) => ({
          ...prev,
          location: resData.cityName,
          rainPercent: resData.rainPercent,
          humidity: resData.humidity,
          weather: resData.weather,
          temperature: resData.temperature,
          maxTemperature: resData.maxTemperature,
          minTemperature: resData.minTemperature,
          dust: resData.dust,
        }));
      })
      .catch((err) => {
        console.log("[AX] get notice weather:::", err);
      });
  };

  React.useEffect(() => {
    dispatch(textLogo(false));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      setText("확인할 수 없다 ㅠㅠ");
    }
    apis
      .getStarHotAX()
      .then((response) => {
        console.log("[AX] star hot:::", response);
        setHot(response.data.data.starList);
        setHotTime(response.data.data.currentTime);
      })
      .catch((err) => console.log("[AX] star hot error:::", err));
  }, []);

  React.useEffect(() => {
    weatherNow();
    apis
      .getNoticeAX(userLocation.lat, userLocation.lon)
      .then((response) => {
        console.log("get notice:::", response);
        const resData = response.data.data;
        setData((prev) => ({
          ...prev,
          moonrise:
            resData.moonrise.slice(0, 2) + ":" + resData.moonrise.slice(2, 4),
          moonset:
            resData.moonset.slice(0, 2) + ":" + resData.moonset.slice(2, 4),
          starGazing: resData.starGazing,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userLocation]);

  const liArray = Array.from(new Array(11).keys());

  const locationButton = () => {
    weatherNow();
    console.log("user location :::", userLocation);
  };

  return (
    <React.Fragment>
      <div className="CommonPageStyle CommonGap">
        <StyledStar>
          <div>
            <LocationBox className="contentsBox">
              <img src={ic_map} alt="map icon" />
              <h3>{data.location}</h3>
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
            <WeatherBox className="contentsBox">
              <WeatherTemperature>
                <div>
                  <img
                    src={
                      data.weather === "맑음"
                        ? ic_sunny
                        : data.weather === "흐림"
                        ? ic_overcast
                        : data.weather === "구름많음"
                        ? ic_cloudy
                        : null
                    }
                    alt="weather logo"
                  />
                  <div className="temperature">
                    <h3 className="openSans">
                      {data.temperature}
                      <span>°C</span>
                    </h3>
                    <p>
                      {data.minTemperature}° / {data.maxTemperature}°
                    </p>
                  </div>
                </div>
                <p className="comment">{data.weather}</p>
              </WeatherTemperature>
              <span className="line" />
              <WeatherETC>
                <section>
                  <h3>미세먼지</h3>
                  <img
                    src={
                      data.dust <= 30
                        ? ic_finedust1
                        : (data.dust > 30 && data.dust) <= 80
                        ? ic_finedust2
                        : (data.dust > 80 && data.dust) <= 150
                        ? ic_finedust3
                        : ic_finedust4
                    }
                    alt="finedust icon"
                  />
                  <p className="openSans">{data.dust}</p>
                </section>
                <section>
                  <h3>강수확률</h3>
                  <img src={ic_umbrella} alt="ultra finedust icon" />
                  <p className="openSans">
                    {data.rainPercent}
                    <span>%</span>
                  </p>
                </section>
                <section>
                  <h3>습도</h3>
                  <img src={ic_humidity} alt="humidity icon" />
                  <p className="openSans">
                    {data.humidity}
                    <span>%</span>
                  </p>
                </section>
              </WeatherETC>
            </WeatherBox>
            <VisiblityBox className="contentsBox" visiblity={data.starGazing}>
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
              <section className="contentsBox">
                <h3>
                  <img src={ic_moonrise} alt="moon icon" />
                  월출
                </h3>
                <p className="openSans">{data.moonrise}</p>
              </section>
              <section className="contentsBox">
                <h3>
                  <img src={ic_moonset} alt="moon icon" />
                  월몰
                </h3>
                <p className="openSans">{data.moonset}</p>
              </section>
            </MoonBox>
          </div>
          <div>
            <ImageBox className="contentsBox">
              <button>
                <span className="buttonHover">별자리 설명</span>
                <section className="buttonActive">
                  <h3>사수자리</h3>
                  <p>
                    궁수자리는 황도 12궁의 하나이며, 전갈자리의 동쪽, 염소자리의
                    서쪽에 있는 별자리이다. 흔히 활을 당기는 켄타우로스로
                    묘사된다.
                  </p>
                </section>
                ?
              </button>
              <img src={image_sample} alt="star" />
            </ImageBox>
            <RecommendBox className="contentsBox">
              <div>
                <h3>실시간 별보기 좋은 지역</h3>
                <p className="openSans">{hotTime} 기준</p>
              </div>
              <span className="line" />
              <ul>
                {hot.map((l, idx) => {
                  return (
                    <li key={idx}>
                      <img
                        src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg"
                        alt="star"
                      />
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

const StyledStar = styled.main`
  display: flex;
  gap: 24px;

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
