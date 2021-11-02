import React from "react";
import styled from "styled-components";
import { Text, Image, Grid } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Card = (props) => {
  return (
    <Wrapper>
      <InfoDiv>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          display="inline-block"
          size="1x"
        />
        <Location>아름다운 금수강산</Location>
        <NicknameDiv>작성자 홍고구마</NicknameDiv>
      </InfoDiv>
      <Image
        height="170px"
        shape={"rectangle"}
        src="https://campimage.s3.ap-northeast-2.amazonaws.com/campimage.jpg"
      />
      <TextDiv>
        <TitleDiv>
          <Text size="18px" bold margin="0 0 0 0">
            Title comes here
          </Text>
        </TitleDiv>

        <ContentDiv>
          <Text size="15px" lineHeight="23px">
            Content comes here Content comes here Content comes here Content
            comes here Content comes hereContent comes here Content comes
            hereContent comes here Content comes here Content comes here Content
            comes here Content comes here Content comes here Content comes here
            Content comes here Content comes here Content comes here
          </Text>
        </ContentDiv>
      </TextDiv>

      <BottomDiv>
        <DateDiv>2021년 10월 1일 작성</DateDiv>
        <LikeDiv>
          <FontAwesomeIcon icon={faHeart} /> 좋아요 10개
        </LikeDiv>
      </BottomDiv>
    </Wrapper>
  );
};

const InfoDiv = styled.div`
  padding: 5px;
  float: left;
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

const TitleDiv = styled.div`
  overflow: hidden;
  line-clamp: 1;
  height: 20px;
  resize: none;
`;

const ContentDiv = styled.div`
  height: 70px;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  line-clamp: 3;
`;

const Wrapper = styled.div`
  width: 340px;
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 50px auto 20px auto;
  margin-right: 20px;
  border-radius: 10px;
  background-color: lightgray;
  padding: 5px;

  :hover {
    cursor: pointer;
    transform: translateY(-12px);
    box-shadow: 0 3px 40px 0 #ddd;
  }
`;

const TextDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
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
