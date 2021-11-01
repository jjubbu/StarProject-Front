import React from "react";
import Header from "../components/Header";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// https://github.com/JaeSeoKim/react-kakao-maps-sdk

import ic_location_off from "../img/main-star/ic_location_off.svg";

const CampMap = () => {
  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <Header />
        <main>
          <div>
            <label>
              <img src={ic_location_off} alt="location icon" />
              <input placeholder="캠핑장명/지역명으로 검색" />
            </label>
            <secion>
              <h3>전체(100)</h3>
              <ul>
                <li>
                  <img />
                </li>
              </ul>
            </secion>
          </div>
          <section>
            <Map
              center={{ lat: 33.5563, lng: 126.79581 }}
              style={{ width: "100%", height: "360px" }}
            >
              <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>Hello World!</div>
              </MapMarker>
            </Map>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default CampMap;
