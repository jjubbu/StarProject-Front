import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ic_star from "../img/ic_star.svg";
import ic_moonrise from "../img/ic_moonrise.svg";
import ic_moonset from "../img/ic_moonset.svg";
import ic_mypage from "../img/ic_mypage.svg";
import ic_sunny from "../img/weather/ic_sunny.svg";
import ic_heart from "../img/ic_heart.svg";
import ic_heart_on from "../img/ic_heart_on.svg";
import ic_bookmark from "../img/ic_bookmark_off.svg";
import ic_bookmark_on from "../img/ic_bookmark_on.svg";
import ic_arrow from "../img/ic_slideArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { actionCreators as loginCheckAction } from "../redux/modules/login";
import card from "../redux/modules/card";
import { apis } from "../lib/axios";
import axios from "axios";

const Detail = ({ history, location, match }) => {
  const [data, setData] = useState({
    id: "3",
    writer: "홍길동",
    title: "칠성캠핑장",
    address: "구리시 어디구 야산",
    img: "/src",
    content: " 본문 ",
    x_location: "128.7175212",
    y_location: "38.0277534",
    likeCheck: "false",
    likeCount: "1",
    bookmarkCheck: "false",
    weather: {
      cityName: "경기도 구리시",
      date: "2021.10.31 14:58",
      starGazing: "10",
      moonrise: "06:00",
      moonset: "16:00",
      weatherList: [
        {
          time: "16:00",
          rainPercent: "35",
          weather: "흐림",
          humidity: "53",
          temperature: "17",
          dust: "25",
        },
        {
          time: "17:00",
          rainPercent: "35",
          weather: "흐림",
          humidity: "53",
          temperature: "17",
          dust: "25",
        },
      ],
    },
  });

  const [markButton, setMarkButton] = React.useState({
    like: false,
    bookmark: false,
  });

  const [likeCount, setLikeCount] = React.useState(0);
  const [slideY, setSlideY] = React.useState(0);
  const [is_press, setPress] = React.useState(false);

  const is_login = useSelector((state) => state.login.is_login);
  const weather = data.weather;
  const wList = weather.weatherList;
  const dispatch = useDispatch();

  const markFunc = (data, name) => {
    if (name === "like") {
      setLikeCount(data.data.likeCount);
    }
    if (data.code === 200) {
      setMarkButton((prev) => ({
        ...prev,
        [name]: true,
      }));
      console.log("mark ::: ", data);
    } else if (data.code === 201) {
      setMarkButton((prev) => ({
        ...prev,
        [name]: false,
      }));
      console.log("mark ::: ", data);
    } else {
      console.log("mark fail ::: ", data);
    }
  };
  const bookmarkAxios = () => {
    apis
      .postBookmarkAX(data.id)
      .then((response) => {
        markFunc(response.data, "bookmark");
      })
      .catch((err) => console.log(err));
  };
  const likeAxios = () => {
    apis
      .postLikeAX(data.id)
      .then((response) => {
        markFunc(response.data, "like");
      })
      .catch((err) => console.log(err));
  };
  const markClick = (e) => {
    const name = e.target.name;
    if (is_login) {
      name === "bookmark" ? bookmarkAxios() : likeAxios();
    } else {
      alert("로그인을 해주세요!");
      history.push("/login");
    }
  };
  const slideButton = (e) => {
    const name = e.target.name;
    console.log(slideY);
    setPress(true);
    console.log(is_press);

    if (is_press) {
      if (slideY === 0 && name === "next") {
        setSlideY(slideY - 100);
      } else if (slideY < 0 && slideY >= -1566) {
        setSlideY(name === "next" ? slideY - 100 : slideY + 100);
      }
    }
    setTimeout(200);
  };

  React.useEffect(() => {
    // setData(getPostByID(id));
    dispatch(loginCheckAction.isLoginMW());
    const id = window.location.pathname.split("/")[2];
    apis.getPostDetailAX(id).then((response) => {
      console.log("post detail:::", response);
      if (response.data.code === 200) {
        setData(response.data.data);
        setMarkButton({
          like: response.data.data.likeCheck,
          bookmark: response.data.data.bookmarkCheck,
        });
        setLikeCount(response.data.data.likeCount);
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
              center={{ lat: data.y_location, lng: data.x_location }}
              style={{ width: "100%", height: "360px" }}
            >
              <MapMarker
                position={{ lat: data.y_location, lng: data.x_location }}
              />
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

            <WeatherTable slideY={slideY}>
              <button className="slidePrev">
                <img
                  src={ic_arrow}
                  alt="prev button"
                  name="prev"
                  onMouseDown={slideButton}
                  onMouseUp={() => {
                    setPress(false);
                  }}
                />
              </button>
              <button className="slideNext">
                <img
                  src={ic_arrow}
                  alt="next button"
                  name="next"
                  onMouseDown={slideButton}
                  onMouseUp={() => {
                    setPress(false);
                  }}
                />
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
                <div>
                  {wList?.map((l, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="openSans thinPlus">
                          {l.time.slice(0, 2) + ":" + l.time.slice(2, 4)}
                        </td>
                        <td>
                          <img src={ic_sunny} alt="weather" />
                        </td>
                        <td className="openSans temperature">
                          {l.temperature}°
                        </td>
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
                </div>
              </tbody>
            </WeatherTable>
          </WeatherInfoBox>
        </div>
        <ContentBox>
          <ContentHeader>
            <div className="titleBox">
              <h3>{data.title}</h3>
              <p className="openSans">2021.00.00 작성</p>
            </div>
            <div className="buttonBox">
              <button className="openSans" name="like" onClick={markClick}>
                <img
                  src={markButton.like ? ic_heart_on : ic_heart}
                  alt="like button"
                  name="like"
                />
                {likeCount}
              </button>
              <button name="bookmark" onClick={markClick}>
                <img
                  src={markButton.bookmark ? ic_bookmark_on : ic_bookmark}
                  alt="bookmark button"
                  name="bookmark"
                />
              </button>
            </div>
          </ContentHeader>
          <ContentUser>
            <img src={ic_mypage} alt="user profile" />
            <h3 className="openSans">{data.writer}</h3>
          </ContentUser>
          <span className="line" />
          <section className="contents">
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </section>
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
    position: relative;
    flex: 1;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    & > div {
      position: absolute;
      top: 0;
      left: ${(props) => props.slideY}px;
      display: flex;
      gap: 18px;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    tr:last-child {
    }
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
