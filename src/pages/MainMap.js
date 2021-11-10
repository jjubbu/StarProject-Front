import React from "react";
import styled, { keyframes } from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import ic_location_off from "../img/map/ic_location_off.svg";
import ic_location_on from "../img/map/ic_location_on.svg";
import ic_map from "../img/map/ic_map.svg";
import ic_option from "../img/option.svg";
import ic_search from "../img/map/ic_search.svg";
import ic_star from "../img/ic_star.svg";
import { apis } from "../lib/axios";

import { history } from "../redux/configureStore";
import axios from "axios";

const MainMap = () => {
  const [is_search, setSearch] = React.useState(false);
  const [is_loading, setLoading] = React.useState();
  const testArray = [1, 2, 3, 4, 5];
  const testSearchArray = [1, 2, 3, 4, 5];
  const [mapLocation, setMapLocation] = React.useState({
    lat: 37.3645764,
    lon: 127.834038,
  });
  const [resultList, setResultList] = React.useState();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (x) => {
    const position = x.coords;
    const latitude = position.latitude;
    const longitude = position.longitude;
    console.log(latitude, longitude);
    setMapLocation({ lat: latitude, lon: longitude });
    setLoading(false);
  };

  const error = (x) => {
    console.log(x.code + ":::" + x.message);
  };

  const setLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("확인할 수 없다 ㅠㅠ");
      return;
    }
    console.log("set location");
  };

  const searchCity = (e) => {
    const text = e.target.value;
    const params = `?cityName=${text}`;
    if (window.event.keyCode === 13) {
      console.log("enter", text);
      apis.getMapListAX(params).then((response) => {
        console.log(response);
      });
    }
  };
  const listClick = (id) => {
    // history.push(`detail/${id}`);
  };

  const optionClick = (e) => {
    const target = e.target.value;
    const newList = [...resultList].sort((x, y) => {
      if (target === "ascending") {
        return x.title < y.title ? -1 : x.title > y.title ? 1 : 0;
      } else {
        return x.title > y.title ? -1 : x.title < y.title ? 1 : 0;
      }
    });
    const latitude = newList[0].y_location;
    const longitude = newList[0].x_location;
    setResultList(newList);
    setMapLocation({ lat: latitude, lon: longitude });
  };

  React.useEffect(() => {
    setLoading(true);
    apis
      .getMapListAX()
      .then((response) => {
        const list = [...response.data.data].sort((x, y) => {
          return x.title > y.title ? -1 : x.title < y.title ? 1 : 0;
        });
        const latitude = list[0].y_location;
        const longitude = list[0].x_location;
        setResultList(list);
        setMapLocation({ lat: latitude, lon: longitude });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <StyledMap>
          <ResultBox>
            <ResultHeader url={ic_option}>
              <h3>전체({resultList.length})</h3>
              <div>
                <select onChange={optionClick}>
                  <option value="descending">내림차순</option>
                  <option value="ascending">오름차순</option>
                </select>
                <span className="styledSelect" />
              </div>
            </ResultHeader>
            <ResultListBox>
              {resultList ? (
                resultList.map((l, idx) => {
                  return (
                    <li
                      key={idx}
                      id={l.id}
                      onClick={() => {
                        listClick(l.id);
                        console.log("lat:::", l.y_location);
                        console.log("lon:::", l.x_location);
                      }}
                    >
                      <img src={l.img} alt="camp" />
                      <div className="campInfo">
                        <div className="title">
                          <h3>{l.title}</h3>
                          <p>{l.address}</p>
                        </div>
                        <div className="starView">
                          <img src={ic_star} alt="star icon" />
                          <p>
                            <strong>관측지수</strong>(좋음){" "}
                            <span>{l.starGazing}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <h1>검색 결과가 없습니다.</h1>
              )}
            </ResultListBox>
          </ResultBox>
          <MapBox>
            {is_loading ? <span className="loading">로딩중</span> : null}

            <SearchBox is_search={is_search}>
              <div>
                <label>
                  <img src={ic_search} alt="search icon" />
                  <input
                    type="text"
                    placeholder="지역명으로 검색"
                    onKeyPress={searchCity}
                  />
                </label>
                <button onClick={setLocation}>
                  <img
                    src={ic_location_off}
                    alt="location icon"
                    className="off"
                    onClick={() => {
                      console.log("aaa");
                    }}
                  />
                  <img
                    src={ic_location_on}
                    alt="location icon"
                    className="on"
                    onClick={() => {
                      console.log("dajfew");
                    }}
                  />
                </button>
              </div>

              {is_search ? (
                <SearchList>
                  {testSearchArray.map((l, idx) => {
                    return (
                      <li key={idx}>
                        <img src={ic_map} alt="map icon" />
                        서울특별시
                      </li>
                    );
                  })}
                </SearchList>
              ) : null}
            </SearchBox>
            <Map
              center={{
                lat: mapLocation.lat,
                lng: mapLocation.lon,
              }}
              style={{ width: "100%", height: "792px" }}
            >
              {resultList
                ? resultList.map((l, idx) => {
                    return (
                      <MapMarker
                        key={idx}
                        position={{ lat: l.y_location, lng: l.x_location }}
                      >
                        <div style={{ color: "#000" }}>{l.title}</div>
                      </MapMarker>
                    );
                  })
                : null}
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

const loadingAni = keyframes`
0%{transform:rotate(0)}
100%{transform:rotate(360deg)}
`;

const MapBox = styled.section`
  position: relative;
  width: 66%;
  overflow: hidden;

  .loading {
    position: absolute;
    text-indent: -9999px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    &::after {
      content: "";
      display: block;
      width: 100px;
      height: 100px;
      border: 5px solid white;
      animation: ${loadingAni} 3s infinite linear;
    }
  }
`;

const SearchBox = styled.div`
  position: absolute;
  top: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: #000000;
  opacity: 0.7;
  ${(props) =>
    props.is_search ? "border-radius:10px;" : "border-radius:28px;"}
  & > div {
    width: 400px;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
  }
  button {
    border: none;
    background: none;
    width: 24px;
    height: 24px;
  }
  img {
    width: 24px;
    height: 24px;
  }
  .on {
    display: none;
  }
  .off:active {
    display: none;
  }
  .off:active ~ .on {
    display: block;
  }
  label {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  input {
    background: none;
    border: none;
    width: 100%;
    color: white;

    &::placeholder {
      color: white;
    }
    &:focus {
      outline: none;
    }
  }
`;

const SearchList = styled.ul`
  margin: 0px 20px;
  padding: 8px 0;
  border-top: 1px solid #ccc;
  li {
    display: flex;
    align-items: center;
    padding: 8px 0;
    font-size: 14px;
    line-height: 18px;
    gap: 8px;
  }
`;

const ResultBox = styled.section`
  width: 32%;
  padding: 36px 28px 0;
  display: flex;
  flex-direction: column;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
  }

  div {
    position: relative;
    width: 57px;
  }

  select {
    width: 57px;
    border: none;
    background-color: transparent;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    color: #eeeeee;
    appearance: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    &:focus {
      outline: none;
    }
    &::-ms-expand {
      display: none;
    }

    option {
      text-align: left;
    }
  }
  .styledSelect {
    width: 8px;
    height: 8px;
    display: block;
    border-top: 4px solid #999999;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 0;
  }
`;

const ResultListBox = styled.ul`
  margin-top: 4px;
  overflow-y: scroll;
  li:last-child {
    border: none;
  }
  li {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 0 16.5px;
    border-bottom: 1px solid #666666;

    img {
      width: 88px;
      height: 88px;
      border-radius: 10px;
      object-fit: cover;
    }
    .campInfo {
      display: flex;
      height: 92px;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-weight: bold;
        font-size: 16px;
        line-height: 20px;
      }
      .title p {
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #eeeeee;
        margin-top: 6px;
      }
    }
    .starView {
      font-size: 12px;
      line-height: 15px;
      color: #eeeeee;
      display: flex;
      align-items: center;
      gap: 2px;
      img {
        width: 16px;
        height: 16px;
      }
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 15px;
        strong {
          margin-right: 2px;
        }
        span {
          margin-left: 8px;
        }
      }
      span {
        font-weight: bold;
        font-size: 18px;
        height: 25px;
        color: #ffffff;
        padding-top: 6px;
      }
    }
  }
`;

export default MainMap;
