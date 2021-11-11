import React from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";

import ic_map from "../img/map/ic_map.svg";
import ic_profile from "../img/ic_profile.svg";

const Card = (props) => {
  const [like, setLike] = React.useState(false);
  const toggleLike = () => setLike(!like);

  return (
    <Wrapper>
      <div>
        <Image
          height="288px"
          shape={"rectangle"}
          src={props.img}
          oject-fit={"cover"}
        />
        <InfoDiv>
          <img src={ic_map} alt="address icon" />
          <Location>{props.address}</Location>
        </InfoDiv>
      </div>

      <div>
        <TextDiv>
          <TitleDiv>{props.title}</TitleDiv>
          <ContentDiv>
            <Text size="16px" lineHeight="30px" color="white">
              {props.contents}
            </Text>
          </ContentDiv>
        </TextDiv>
        <DateDiv>{props.modifiedAt} 작성</DateDiv>
        <HorizontalLine />
        <BottomDiv>
          <Image shape="circle" src={ic_profile} size="24" />
          <h3>{props.writer}</h3>
          {/* <LikeDiv>
            <FontAwesomeIcon
              type="button"
              icon={emptyHeart}
              like={like}
              onClick={toggleLike}
            />
            좋아요 {props.like}개
          </LikeDiv> */}
        </BottomDiv>
      </div>
    </Wrapper>
  );
};

Card.defaultProps = {};

const InfoDiv = styled.div`
  padding: 5px;
  float: left;
  position: absolute;
  z-index: 3;
  top: 20px;
  left: 20px;
  background-color: #000000;
  opacity: 0.8;
  height: 28px;
  width: fit-content;
  border-radius: 14px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Location = styled.div`
  font-size: 12px;
  display: inline-block;
  margin-left: 5px;
`;

const TextDiv = styled.div`
  /* display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; */
`;

const TitleDiv = styled.div`
  overflow: hidden;
  line-clamp: 1;
  resize: none;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  margin-left: 20px;
  margin-top: 28px;
`;

const ContentDiv = styled.div`
  width: 344px;
  height: 40px;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  line-clamp: 3;
  line-height: 20.03px;
  margin-left: 20px;
  margin-top: 16px;
  color: #ffffff;
`;

const HorizontalLine = styled.div`
  height: 1px;
  background: #666666;
`;

const Wrapper = styled.div`
  width: 388px;
  height: 504px;
  display: flex;
  flex-direction: column;
  justify-content: flex;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 50px auto 20px auto;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #303136;
  & > div:first-child {
    height: fit-content;
    position: relative;
  }
  :hover {
    cursor: pointer;
    transform: translateY(-12px);
    box-shadow: 0 3px 40px 0 #ddd;
  }
`;

const DateDiv = styled.div`
  display: inline-block;
  font-size: 12px;
  margin-left: 20px;
  margin-top: 18px;
  margin-bottom: 20px;
  line-height: 18px;
  color: #999999;
`;

const LikeDiv = styled.div`
  display: inline-block;
  float: right;
  margin-right: 15px;
  font-size: 15px;
`;

const BottomDiv = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  /* img {
    margin-right: 20px;
  } */
  h3 {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-left: 8px;
    font-weight: normal;
    font-style: normal;
    color: #cccccc;
  }
`;

// const NicknameDiv = styled.div`
//   font-size: 12px;
//   display: inline-block;
//   float: left;
//   size: 14px;
//   color: gray;
// `;

// const InfoDiv = styled.div`
//   height: 35px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 20px 20px 20px 20px;
// `;

export default Card;
