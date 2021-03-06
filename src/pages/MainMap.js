import React from "react";
import styled from "styled-components";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import _ from "lodash";

import { apis } from "../lib/axios";
import HelmetComp from "../components/HelmetComp";
import ic_location_off from "../img/map/ic_location_off.svg";
import ic_location_on from "../img/map/ic_location_on.svg";
import ic_map from "../img/map/ic_map.svg";
import ic_map_b from "../img/map/ic_map_b.svg";
import ic_option from "../img/option.svg";
import ic_search from "../img/map/ic_search.svg";
import ic_star from "../img/ic_star.svg";
import ic_loading from "../img/loading.gif";
import ic_logo from "../img/ic_logo.svg";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { textLogo } from "../redux/modules/header";
import { actionCreators as locationAction } from "../redux/modules/user";

const MainMap = () => {
  const [is_search, setSearch] = React.useState(false);
  const [is_loading, setLoading] = React.useState();
  const [searchValue, setSearchValue] = React.useState("");
  const [mapLocation, setMapLocation] = React.useState({
    lat: 37.3645764,
    lon: 127.834038,
  });
  const [resultList, setResultList] = React.useState([{}]);
  const [searchList, setSearchList] = React.useState([{}]);
  const [pageNum, setPageNum] = React.useState({ page: 1, max: 1 });
  const [dataSize, setDataSize] = React.useState(0);
  const [params, setParams] = React.useState("");
  const [is_markerClick, setIsMarkerClick] = React.useState(false);
  const [markerInfo, setMarkerInfo] = React.useState([{}]);
  const dispatch = useDispatch();
  const user_location = useSelector((state) => state.user.user_location);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getMapList = (params, num) => {
    apis
      .getMapListAX(params, num)
      .then((response) => {
        const data = response.data.data;

        if (data) {
          const list = [...data.dataList].sort((x, y) => {
            return x.title > y.title ? -1 : x.title < y.title ? 1 : 0;
          });

          setResultList(list);
          setPageNum({ page: data.currentPage, max: data.maxPage });
          setDataSize(data.dataSize);
          setIsMarkerClick(false);
        }
      })
      .catch((err) => alert(err));
  };

  const success = (x) => {
    const position = x.coords;
    const latitude = position.latitude;
    const longitude = position.longitude;
    setMapLocation({ lat: latitude, lon: longitude });
    const p = `x_location=${longitude}&y_location=${latitude}&`;
    setParams(p);
    getMapList(p, 1);
    setLoading(false);
    dispatch(locationAction.userLocation({ lat: latitude, lon: longitude }));
  };

  const error = () => {
    alert("?????? ?????? ??????????????? ??????????????????.");
  };

  const setLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  const searchValueChange = (e) => {
    const text = e.target.value;
    setSearchValue(text);
  };

  //???????????? ??????
  const getSearchAuto = React.useMemo(
    () =>
      _.debounce((e) => {
        const text = e.target.value;
        if (text !== "") {
          apis
            .getMapSearchAX(text)
            .then((response) => {
              console.log(response);
              if (response.data.data.length > 0) {
                setSearch(true);
                setSearchList(response.data.data);
              }
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          setSearch(false);
        }
      }, 500),
    []
  );

  const autoSearchClick = (text) => {
    setParams(`cityName=${text}&`);
    if (text !== "?????? ????????? ????????????.") {
      setSearch(false);
      apis
        .getMapListAX(`cityName=${text}&`, 1)
        .then((response) => {
          const data = response.data.data;
          if (data) {
            const list = [...data.dataList].sort((x, y) => {
              return x.title > y.title ? -1 : x.title < y.title ? 1 : 0;
            });
            if (list.length > 0) {
              const latitude = list[0]?.y_location;
              const longitude = list[0]?.x_location;
              setMapLocation({ lat: latitude, lon: longitude });
            }
            setResultList(list);

            setPageNum({ page: data.currentPage, max: data.maxPage });
            setDataSize(data.dataSize);
            setIsMarkerClick(false);
          }
        })
        .then(() => {
          setSearch(false);
          setPageNum((prev) => ({ ...prev, page: 1 }));
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const searchCity = (e) => {
    const text = e.target.value;
    const p = `cityName=${text}&`;
    setParams(`cityName=${text}&`);
    if (window.event.keyCode === 13) {
      apis.getMapListAX(p, 1).then((response) => {
        const data = response.data.data;
        if (data) {
          const list = [...data.dataList].sort((x, y) => {
            return x.title > y.title ? -1 : x.title < y.title ? 1 : 0;
          });
          const latitude = list[0]?.y_location;
          const longitude = list[0]?.x_location;
          setResultList(list);
          setMapLocation({ lat: latitude, lon: longitude });
          setPageNum({ page: data.currentPage, max: data.maxPage });
          setDataSize(data.dataSize);
          setIsMarkerClick(false);
        }
      });
    }
  };
  const listClick = (id) => {
    history.push(`detail/${id}`);
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
    const latitude = newList[0]?.y_location;
    const longitude = newList[0]?.x_location;
    setResultList(newList);
    setIsMarkerClick(false);

    setMapLocation({ lat: latitude, lon: longitude });
  };

  const scrollEvent = (e) => {
    let scrollHeight = document.getElementById("container").scrollHeight;
    let scrollTop = document.getElementById("container").scrollTop;
    let clientHeight = document.getElementById("container").clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (pageNum.page <= pageNum.max) {
        setPageNum((prev) => ({ ...prev, page: pageNum.page + 1 }));
        apis
          .getMapListAX(params, Number(pageNum.page + 1))
          .then(async (response) => {
            const data = response.data.data;
            const mergeData = resultList.concat(...data.dataList);
            setResultList(mergeData);
            if (pageNum.page < pageNum.max) setDataSize(data.dataSize);
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };

  const markerClick = (id) => {
    apis
      .getMapMarkerAX(id)
      .then((response) => {
        const data = response.data.data;
        setMarkerInfo([data]);
        setIsMarkerClick(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const seeAllButton = () => {
    setParams("");
    getMapList("", 1);
  };

  React.useEffect(() => {
    dispatch(textLogo(false));
    if (user_location.lon !== 0) {
      setMapLocation(user_location);
      const p = `x_location=${user_location.lon}&y_location=${user_location.lat}&`;
      setParams(p);
      getMapList(p, 1);
    } else {
      setLocation();
    }
  }, []);

  return (
    <React.Fragment>
      <HelmetComp title="??????" url="https://stellakorea.co.kr/map" />
      <div className="CommonPageStyle CommonGap">
        <StyledMap>
          <ResultBox>
            <ResultHeader url={ic_option}>
              <h3>??????({dataSize})</h3>
              <div>
                <button onClick={seeAllButton}>?????? ??????</button>
                <select onChange={optionClick}>
                  <option value="descending">????????????</option>
                  <option value="ascending">????????????</option>
                </select>
                <span className="styledSelect" />
              </div>
            </ResultHeader>
            <ResultListBox id="container" onScroll={scrollEvent}>
              {!is_loading && resultList.length > 0 ? (
                (is_markerClick ? markerInfo : resultList)?.map((l, idx) => {
                  return (
                    <li
                      key={idx}
                      id={l.id}
                      onClick={() => {
                        listClick(l.id);
                      }}
                    >
                      <img src={l.img !== "" ? l.img : ic_logo} alt="camp" />
                      <div className="campInfo">
                        <div className="title">
                          <h3>{l.title}</h3>
                          <p>{l.address}</p>
                        </div>
                        <div className="starView">
                          <img src={ic_star} alt="star icon" />
                          <p>
                            <strong>????????????</strong>(??????){" "}
                            <span>{l.starGazing}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div>
                  <h3>?????? ????????? ????????????.</h3>
                </div>
              )}
            </ResultListBox>
          </ResultBox>
          <MapBox>
            {is_loading ? (
              <div className="loading">
                <img src={ic_loading} alt="loading" />
              </div>
            ) : null}

            <SearchBox is_search={is_search}>
              <div>
                <label>
                  <img src={ic_search} alt="search icon" />
                  <input
                    type="text"
                    placeholder="??????????????? ??????"
                    onKeyPress={searchCity}
                    onChange={(e) => {
                      getSearchAuto(e);
                      searchValueChange(e);
                    }}
                    value={searchValue}
                  />
                </label>
                <button onClick={setLocation}>
                  <img
                    src={ic_location_off}
                    alt="location icon"
                    className="off"
                  />
                  <img
                    src={ic_location_on}
                    alt="location icon"
                    className="on"
                  />
                </button>
              </div>

              {is_search ? (
                <SearchList>
                  {searchList?.map((l, idx) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          autoSearchClick(l.cityName);
                        }}
                      >
                        <img src={ic_map} alt="map icon" />
                        {l.cityName}
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
              {resultList.length > 0
                ? resultList?.map((l, idx) => {
                    return (
                      <React.Fragment>
                        <MapMarker
                          key={idx}
                          position={{ lat: l?.y_location, lng: l?.x_location }}
                          clickable={true}
                          onClick={() => {
                            markerClick(l.id);
                          }}
                          image={{
                            src: `${ic_map_b}`,
                            size: {
                              width: 48,
                              height: 48,
                            },
                            options: {
                              offset: {
                                x: 27,
                                y: 69,
                              },
                            },
                          }}
                        />
                        <CustomOverlayMap
                          position={{ lat: l?.y_location, lng: l?.x_location }}
                          yAnchor={1}
                        >
                          <MapMarkerCustom
                            className="customoverlay"
                            onClick={() => {
                              markerClick(l.id);
                            }}
                          >
                            <span className="title">
                              {l.title} {String(">")}
                            </span>
                          </MapMarkerCustom>
                        </CustomOverlayMap>
                      </React.Fragment>
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

  @media only screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    height: auto;
    & > section {
      height: 600px;
    }
  }
  @media only screen and (max-width: 480px) {
    flex-direction: column-reverse;
    height: auto;
    & > section {
      height: 400px;
    }
  }
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
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    img {
      width: 200px;
      height: 200px;
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
    height: 400px;
  }
`;

const MapMarkerCustom = styled.div`
  color: black;
  background-color: white;
  width: fit-content;
  border: 2px solid #000;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 75px;
  span {
    display: block;
    height: 38px;
    padding: 0 15px;
    line-height: 38px;
  }
`;

const SearchBox = styled.div`
  position: absolute;
  top: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
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
  .off:hover {
    display: none;
  }
  .off:hover ~ .on {
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
  @media only screen and (max-width: 480px) {
    width: calc(100% - 32px);
    top: 20px;
    & > div {
      width: 100%;
      height: 40px;
    }
    button {
      width: 16px;
      height: 16px;
    }
    img {
      width: 16px;
      height: 16px;
    }
    input {
      font-size: 12px;
      line-height: 16px;
      color: #eeeeee;
      &::placeholder {
        font-size: 12px;
        line-height: 16px;
        color: #eeeeee;
      }
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
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
  @media only screen and (max-width: 480px) {
    padding: 24px 24px 0 24px;
  }
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }

  div {
    position: relative;
    width: 57px;
    display: flex;
    gap: 10px;
  }

  button {
    font-size: 12px;
    line-height: 15px;
    position: absolute;
    right: 67px;
    top: 50%;
    transform: translateY(-50%);
    width: fit-content;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    &:hover {
      color: #ffce00;
    }
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
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
      flex: 1;
      height: 92px;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
  & > div {
    display: flex;
    width: 100%;
    height: 710px;
    align-items: center;
    justify-content: center;
    h3 {
      font-weight: 400;
    }
    @media only screen and (max-width: 480px) {
      height: 356px;
    }
  }
`;

export default MainMap;
