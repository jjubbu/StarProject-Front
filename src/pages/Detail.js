import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { apis } from "../lib/axios";
import HelmetComp from "../components/HelmetComp";
import ic_star from "../img/ic_star.svg";
import ic_moonrise from "../img/ic_moonrise.svg";
import ic_moonset from "../img/ic_moonset.svg";
import ic_mypage from "../img/ic_mypage.svg";
import ic_sunny from "../img/weather/ic_sunny.svg";
import ic_cloudy from "../img/weather/ic_cloudy.svg"; //구름많음
import ic_overcast from "../img/weather/ic_overcast.svg"; //흐림
import ic_heart from "../img/ic_heart.svg";
import ic_heart_on from "../img/ic_heart_on.svg";
import ic_bookmark from "../img/ic_bookmark_off.svg";
import ic_bookmark_on from "../img/ic_bookmark_on.svg";
import ic_arrow from "../img/ic_slideArrow.svg";
import ic_address from "../img/map/ic_map.svg";
import ic_reply from "../img/icon_reply.svg";
import ic_user from "../img/ic_mypage.svg";
import ic_drop from "../img/icon_drop.svg";

import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import { actionCreators as loginCheckAction } from "../redux/modules/login";
import { actionCreators as editDataAction } from "../redux/modules/edit";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      id="prevButton"
      style={{
        ...style,
        position: "absolute",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      id="nextButton"
      style={{
        ...style,
        position: "absolute",
      }}
      onClick={onClick}
    />
  );
}

const Detail = ({ history, location, match }) => {
  const [data, setData] = React.useState({
    id: "3",
    date: "2021.10.31 14:58",
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
  const [commentShow, setCommentShow] = React.useState(true);

  const test_list = [
    {
      nickname: "안녕하새요",
      date: "2021-12-14",
      comment:
        "우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾",
    },
    {
      nickname: "안녕하새요",
      date: "2021-12-14",
      comment:
        "우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾",
    },
    {
      nickname: "안녕하새요",
      date: "2021-12-14",
      comment:
        "우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾우엑뿌엑쀼엑으엑쀽빾쀾빾",
    },
  ];

  const is_login = useSelector((state) => state.login.is_login);
  const weather = data.weather;
  const wList = weather.weatherList;
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.login.user_info.nickname);
  const writer = data.writer;

  const markFunc = (data, name) => {
    if (name === "like") {
      setLikeCount(data.data.likeCount);
    }
    if (data.code === 200) {
      setMarkButton((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else if (data.code === 201) {
      setMarkButton((prev) => ({
        ...prev,
        [name]: false,
      }));
    } else {
    }
  };
  const bookmarkAxios = () => {
    apis
      .postBookmarkAX(data.id)
      .then((response) => {
        markFunc(response.data, "bookmark");
      })
      .catch((err) => alert(err));
  };
  const likeAxios = () => {
    apis
      .postLikeAX(data.id)
      .then((response) => {
        markFunc(response.data, "like");
      })
      .catch((err) => alert(err));
  };

  const deleteAxios = () => {
    apis.getDeletePostAX(data.id).then((response) => {
      if (response.data.code === 200) {
        alert("게시글이 삭제되었습니다.");
        history.push("/community");
      } else {
        alert(response.data.data);
      }
    });
  };

  const editClick = () => {
    const editData = {
      title: data.title,
      content: data.content,
      address: data.address,
      id: data.id,
    };
    dispatch(editDataAction.addData(editData));
    history.push("/post/edit");
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

  const showComment = () => {
    setCommentShow((prev) => !prev);
  };

  React.useEffect(() => {
    dispatch(loginCheckAction.isLoginMW());
    const id = window.location.pathname.split("/")[2];
    apis
      .getPostDetailAX(id)
      .then((response) => {
        const data = response.data;
        if (data.code === 200) {
          setData(data.data);
          setMarkButton({
            like: data.data.likeCheck,
            bookmark: data.data.bookmarkCheck,
          });
          setLikeCount(data.data.likeCount);
        }
      })
      .catch((err) => {
        alert(err);
      });

    dispatch(textLogo(false));
  }, [dispatch]);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const sliderButton = (e) => {
    const name = e.target.name;
    if (name === "prev") {
      document.getElementById("nextButton").click();
    } else {
      document.getElementById("prevButton").click();
    }
  };

  return (
    <React.Fragment>
      <HelmetComp
        title={data.title}
        url={`https://stellakorea.co.kr/detail/${data.id}`}
        contents={data.contents}
        frame={data.img}
      />
      <StyledDetail className="CommonPageStyle CommonGap">
        <div className="detailInfoETC">
          <MapBox>
            <Map
              center={{ lat: data.y_location, lng: data.x_location }}
              style={{ width: "100%", height: "100%" }}
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

            <WeatherTable>
              <button className="slidePrev" onClick={sliderButton}>
                <img src={ic_arrow} alt="prev button" name="prev" />
              </button>
              <button className="slideNext" onClick={sliderButton}>
                <img src={ic_arrow} alt="next button" name="next" />
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
                <Slider {...settings}>
                  {wList?.map((l, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="openSans thinPlus">
                          {l.time.slice(0, 2) + ":" + l.time.slice(2, 4)}
                        </td>
                        <td>
                          <img
                            src={
                              l?.weather === "맑음"
                                ? ic_sunny
                                : l?.weather === "흐림"
                                ? ic_overcast
                                : l?.weather === "구름 조금 많음"
                                ? ic_cloudy
                                : null
                            }
                            alt="weather"
                          />
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
                </Slider>
              </tbody>
            </WeatherTable>
          </WeatherInfoBox>
        </div>
        <ContentBox>
          <ContentHeader>
            <div className="titleBox">
              <h3>{data.title}</h3>
              <p className="openSans">{data.date}</p>
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
            <div className="addressBox">
              <img src={ic_address} alt="location icon" />
              <p>{data.address}</p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="contentsInner"
            ></div>
          </section>
          <span className="line" />

          {/* <ContentFooter comment={commentShow ? "on" : ""}>
            <button className="commentDrop" onClick={showComment}>
              댓글(1) <img src={ic_drop} alt="comment drop" />
            </button>

            {is_login && user_info === writer ? (
              <React.Fragment>
                <div className="onlyWriter">
                  <button onClick={editClick}>수정</button>
                  <button onClick={deleteAxios}>삭제</button>
                </div>
              </React.Fragment>
            ) : null}
          </ContentFooter>
          <CommentBox comment={commentShow ? "on" : ""}>
            <CommentInput>
              <button className="openSans">등록</button>
              <label>
                <img src={ic_reply} alt="reply" />
                <textarea placeholder="댓글을 작성해주세요" />
              </label>
            </CommentInput>
            <CommentList>
              {test_list.length > 0 ? (
                test_list.map((l, idx) => {
                  return (
                    <li>
                      <div className="userInfo">
                        <img src={ic_user} alt="user profile" />
                        <div>
                          <h3>{l.nickname}</h3>
                          <p>{l.date}</p>
                        </div>
                      </div>
                      <p>{l.comment}</p>
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </CommentList>
          </CommentBox> */}
        </ContentBox>
      </StyledDetail>
    </React.Fragment>
  );
};

const StyledDetail = styled.main`
  display: flex;
  width: 1200px;
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
  @media only screen and (max-width: 1200px) {
    flex-direction: column-reverse;
    width: 100%;
    .detailInfoETC {
      width: 100%;
      display: flex;
      gap: 20px;
    }
  }
  @media only screen and (max-width: 720px) {
    .detailInfoETC {
      display: block;
    }
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 10px;
  overflow: hidden;
  @media only screen and (max-width: 1200px) {
    width: 50%;
    height: 614px;
  }
  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 360px;
  }
`;

const WeatherInfoBox = styled.section`
  width: 100%;
  height: 614px;
  background: #303136;
  border-radius: 10px;
  margin-top: 20px;
  padding: 36px 36px 56px;
  @media only screen and (max-width: 1200px) {
    width: 50%;
    margin-top: 0px;
  }
  @media only screen and (max-width: 720px) {
    width: 100%;
    margin-top: 20px;
  }
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
    .slick-slider.slick-initialized {
      .slick-prev,
      .slick-next {
        position: absolute;
        left: -9999px;
      }
      .slick-prev:before,
      .slick-next:before {
        position: absolute;
        left: -9999px;
      }
      .slick-track:before,
      .slick-track:after {
        display: none;
      }
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
    text-align: center;
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
  display: flex;
  width: 100%;
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

    .contentsInner {
      font-size: 16px;
      line-height: 20px;
      color: #eee;
    }
    .contentsInner img {
      max-width: 100%;
      margin: 10px 0;
    }
    .addressBox {
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      min-width: 326px;
      width: fit-content;
      border-radius: 40px;
      padding: 21px 17px;
      margin-bottom: 19px;
      gap: 8px;
    }
  }
  @media only screen and (max-width: 480px) {
    overflow-x: hidden;
    .line {
      width: 100vw;
      margin-left: -28px;
      margin-top: 25px;
    }
    .contents {
      margin-top: 24px;
      .addressBox {
        padding: 10px 8px;
        img {
          width: 16px;
          height: 16px;
        }
        p {
          font-size: 12px;
        }
      }
    }
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
  @media only screen and (max-width: 480px) {
    position: relative;
    .titleBox {
      flex-direction: column-reverse;
      margin-top: 0;
      gap: 8px;
      align-items: start;
      h3 {
        font-size: 18px;
        line-height: 18px;
      }
    }
    .buttonBox {
      position: absolute;
      right: 0;
      bottom: -40px;
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
  justify-content: space-between;
  div {
    display: flex;
    gap: 8px;
  }
  align-items: flex-end;
  button {
    background: #18191e;
    border-radius: 4px;
    border: none;
    height: 36px;
    font-size: 14px;
    line-height: 18px;
    color: #cccccc;
    cursor: pointer;
  }
  .onlyWriter {
    button {
      padding: 0 23px;
    }
  }
  .commentDrop {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 11px;
    img {
      ${(props) => (props.comment === "on" ? "" : "transform:rotate(180deg);")}
    }
  }
`;

const CommentBox = styled.section`
  ${(props) => (props.comment ? "display:block;" : "display:none;")}
  margin-top: 20px;
`;

const CommentInput = styled.div`
  position: relative;
  button {
    position: absolute;
    right: 0;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #ddd;
    background: none;
    border: none;
    padding-right: 20px;
    top: 11px;
  }
  label {
    textarea {
      width: 100%;
      padding: 11px 54px;
      border: 1px solid #c4c4c4;
      border-radius: 30px;
      background: none;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #dddddd;
      height: 40px;
      resize: none;
      &::placeholder {
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #dddddd;
      }
    }
    img {
      position: absolute;
      left: 20px;
      top: 8px;
    }
  }
`;

const CommentList = styled.ul`
  display: flex;
  gap: 20px;
  flex-direction: column;
  li:first-child {
    margin-top: 24px;
  }
  li {
    .userInfo {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        width: 28px;
        height: 28px;
      }
      h3 {
        color: #eeeeee;
        font-size: 13px;
        line-height: 16px;
      }
      p {
        font-weight: normal;
        font-size: 9px;
        line-height: 11px;
        color: #ffffff;
      }
    }
    & > p {
      margin-top: 8px;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #eeeeee;
    }
  }
`;
export default Detail;
