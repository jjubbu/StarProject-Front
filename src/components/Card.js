import React from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";

import { useState } from "react";

import ic_map from "../img/map/ic_map.svg";
import ic_profile from "../img/ic_profile.svg";
import ic_heart from "../img/ic_heart.svg";
import ic_heart_on from "../img/ic_heart_on.svg";
import ic_bookmark_off from "../img/ic_bookmark_off.svg";

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
          <img className="ic_heart" src={ic_map} size="5" alt="address icon" />
          <h3>{props.address}</h3>
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
        {/* <HorizontalLine /> */}
        <BottomDiv>
          <div className="profile">
            <img src={ic_profile} alt="ic_profile" />
            <span>{props.writer}</span>
          </div>

          <div className="likeDiv">
            <img className="ic_heart" src={ic_heart} alt="ic_heart" />
            <p className="like">{props.like}</p>

            <div className="bookmarkDiv">
              <img
                className="ic_bookmark_off"
                src={ic_bookmark_off}
                alt="ic_bookmark_off"
              />
              <p className="bookmark">{props.bookmark}</p>
            </div>
          </div>
        </BottomDiv>
      </div>
    </Wrapper>
  );
};

Card.defaultProps = {};

const CardEtcBox = styled.div`
  padding: 19px 20px 17px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #666666;
  .starGazing {
    display: flex;
    align-items: center;

    p {
      margin: 0 4px 0 8px;
      font-size: 16px;
      line-height: 20px;
    }
    span {
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
    }
  }
  .bookmark {
    display: flex;
    align-items: center;
    img {
      margin-right: 4px;
    }
    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
    }
  }
`;

const BottomDiv = styled.div`
  padding: 18px 20px 18px 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #666666;

  .profile {
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-left: 8px;
      font-weight: normal;
      font-style: normal;
      color: #cccccc;
    }
  }
  .likeDiv {
    display: flex;
    align-items: center;

    .like {
      font-size: 14px;
      color: #cccccc;
    }

    .ic_heart {
      margin-right: 4px;
    }
  }

  .bookmarkDiv {
    display: flex;
    align-items: center;
    margin-left: 12px;

    .ic_bookmark {
      margin-right: 2px;
    }
    .bookmark {
      margin-left: 4px;
      font-size: 14px;
      color: #cccccc;
    }
  }
`;

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
  padding-left: 8px;
  padding-right: 12px;
  display: flex;

  h3 {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-left: 4px;
    font-weight: normal;
    font-style: normal;
    color: #ffffff;
  }
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
  width: 384px;
  height: 504px;
  display: flex;
  flex-direction: column;
  justify-content: flex;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  /* margin: 50px auto 20px auto; */
  /* margin-right: 24px; */
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

// const LikeDiv = styled.div`
//   display: inline-block;
//   float: right;
//   margin-right: 15px;
//   font-size: 15px;
// `;

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
