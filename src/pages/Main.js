import React from "react";
import styled from "styled-components";
import video from "../img/video.png";
import arrow from "../img/arrow.svg";

const Main = () => {
  return (
    <React.Fragment>
      <StyldMain>
        <VisualBox url={video}>
          <span />
          <h3>
            밤하늘 야경 명당 캠핑장 <br />
            실시간 별자리 찾기
          </h3>
          <img src={arrow} alt="scroll down" />
        </VisualBox>
        <ContentBox>
          <section>
            <h3>별보기 좋은 캠핑장</h3>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </section>
        </ContentBox>
      </StyldMain>
    </React.Fragment>
  );
};

const StyldMain = styled.div``;

const VisualBox = styled.section`
  height: 772px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span {
    position: absolute;
    width: 100vw;
    height: 890px;
    top: 0;
    z-index: -10;
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
  }

  h3 {
    padding-top: 227px;
    font-weight: bold;
    font-size: 56px;
    line-height: 70px;
    text-align: center;
  }
  img {
    width: 25.5px;
    height: 55px;
    margin-bottom: 41px;
  }
`;

const ContentBox = styled.main`
  max-width: 1200px;
  margin: 100px auto 114px;

  section {
    h3 {
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
    }
    ul {
      display: flex;
      gap: 24px;
      margin-top: 24px;
      li {
        width: 100%;
        height: 288px;
        background-color: #303136;
        border-radius: 10px;
      }
    }
  }
`;

export default Main;
