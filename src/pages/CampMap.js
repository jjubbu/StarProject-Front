import React from "react";
import Header from "../components/Header";
import { Map } from "react-kakao-maps-sdk";

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
            <Map></Map>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default CampMap;
