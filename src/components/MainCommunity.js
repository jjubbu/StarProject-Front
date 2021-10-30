import React from "react";
import { history } from "../redux/configureStore";
import MainMap from "../components/MainMap";

const MainCommunity = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <div>img / nickname / time / btn</div>
      <div>contents</div>
      <div>image</div>
      <div>comment cnt</div>
      <p> test MainCommunity</p>
    </React.Fragment>
  );
};



export default MainCommunity;
