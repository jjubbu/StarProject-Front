import React from "react";
import { history } from "../redux/configureStore";

const MainMap = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <div>img / nickname / time / btn</div>
      <div>contents</div>
      <div>image</div>
      <div>comment cnt</div>
      <p> test MainMap </p>
    </React.Fragment>
  );
};

MainMap.defaultProps = {
  camp_info: {
    camp_address: "서울 구리시",
    camp_name: "내가 찾은 멋진 곳",
    camp_profile:
      "https://campimage.s3.ap-northeast-2.amazonaws.com/campimage.jpg",
  },
  image_url: "https://campimage.s3.ap-northeast-2.amazonaws.com/campimage.jpg",
  contents: "캠핑",
};

//이미지만 S3 - 올린뒤 주소값을 반환을 해서 post
//이미지 주소

export default MainMap;
