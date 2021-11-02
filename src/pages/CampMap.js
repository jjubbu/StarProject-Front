import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// https://github.com/JaeSeoKim/react-kakao-maps-sdk

import ic_location_off from "../img/main-star/ic_location_off.svg";
import { useLocation } from "react-router";

const CampMap = () => {
  const location = useLocation();
  console.log(location);
  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <Header />
        <StyledMap>
          <MapBox>
            <SearchBox>
              <img src={ic_location_off} alt="location icon" />
              <input placeholder="캠핑장명/지역명으로 검색" />
            </SearchBox>
            <Map
              center={{ lat: 33.5563, lng: 126.79581 }}
              style={{ width: "100%", height: "792px" }}
            >
              <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>Hello World!</div>
              </MapMarker>
            </Map>
          </MapBox>
          <ResultBox>
            <h3>전체(100)</h3>
            <ul>
              <li>
                <img />
                <div>
                  <h3>어쩌구캠핑장</h3>
                  <p>서울특별시 어쩌구</p>
                  <div>
                    <span></span>
                    <p>
                      별관측지수(좋음) <span>10</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </ResultBox>
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
    overflow: scroll;
  }
`;

const MapBox = styled.section`
  position: relative;
  width: 66%;
`;

const SearchBox = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const ResultBox = styled.section`
  width: 32%;
`;

export default CampMap;
