import React from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState } from "react";

const Card = (props) => {
  const [like, setLike] = useState(false);
  const toggleLike = () => setLike(!like);

  return (
    <Wrapper>
      <Image
        height="288px"
        shape={"rectangle"}
        src={props.img}
        oject-fit={"cover"}
      />
      <InfoDiv>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          display="inline-block"
          size="1x"
        />
        <Location>{props.주소}</Location>
      </InfoDiv>

      <TextDiv>
        <TitleDiv>{props.title}</TitleDiv>
        <ContentDiv>
          <Text size="15px" lineHeight="30px">
            {props.contents}
          </Text>
        </ContentDiv>
      </TextDiv>

      <BottomDiv>
        <DateDiv>{props.modifiedAt}작성</DateDiv>
        <LikeDiv>
          <FontAwesomeIcon
            type="button"
            icon={emptyHeart}
            like={like}
            onClick={toggleLike}
          />
          좋아요 {props.like}개
        </LikeDiv>
      </BottomDiv>
    </Wrapper>
  );
};

Card.defaultProps = {};

const InfoDiv = styled.div`
  padding: 5px;
  float: left;
  position: relative;
  z-index: 3;
  top: -275px;
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

const NicknameDiv = styled.div`
  font-size: 12px;
  display: inline-block;
  float: right;
  size: 14px;
  color: gray;
`;

const TextDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TitleDiv = styled.div`
  overflow: hidden;
  line-clamp: 1;
  resize: none;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
`;

const ContentDiv = styled.div`
  height: 120px;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  line-clamp: 3;
`;

const Wrapper = styled.div`
  width: 388px;
  height: 504px;
  /* display: flex; */
  flex-direction: column;
  justify-content: flex;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 50px auto 20px auto;
  margin-right: 20px;
  border-radius: 10px;
  background-color: lightgray;

  :hover {
    cursor: pointer;
    transform: translateY(-12px);
    box-shadow: 0 3px 40px 0 #ddd;
  }
`;

const BottomDiv = styled.div`
  margin-top: 5px;
`;

const DateDiv = styled.div`
  display: inline-block;
  font-size: 13px;
  margin-left: 9px;
`;

const LikeDiv = styled.div`
  display: inline-block;
  float: right;
  margin-right: 15px;
  font-size: 15px;
`;

// const InfoDiv = styled.div`
//   height: 35px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 20px 20px 20px 20px;
// `;

export default Card;
