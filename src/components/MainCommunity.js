import React from "react";
import { history } from "../redux/configureStore";
import MainMap from "../components/MainMap";

const MainCommunity = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <div>map</div>
      <div>nickname / title / hashtag / like / bookmark</div>
      <div>image</div>
      <div>des</div>
      <p> test MainCommunity</p>
    </React.Fragment>
  );
};

export default MainCommunity;
