import React from "react";
import { history } from "../redux/configureStore";

<<<<<<< Updated upstream
const Post = (props) => {
=======
const MainMap = (props) => {
>>>>>>> Stashed changes
  console.log(props);
  return (
    <React.Fragment>
      <div>img / nickname / time / btn</div>
      <div>contents</div>
      <div>image</div>
      <div>comment cnt</div>
<<<<<<< Updated upstream
=======
      <p> test MainMap </p>
>>>>>>> Stashed changes
    </React.Fragment>
  );
};

<<<<<<< Updated upstream
Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;
=======
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
>>>>>>> Stashed changes
