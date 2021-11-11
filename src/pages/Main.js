import React from "react";
import styled from "styled-components";

import video from "../img/video.png";
import arrow from "../img/arrow.svg";
import ic_map from "../img/map/ic_map.svg";
import ic_star from "../img/ic_star.svg";
import ic_bookmark_off from "../img/ic_bookmark_off.svg";
import { apis } from "../lib/axios";

const Main = () => {
  const test_card_list = [
    {
      id: 1,
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      bookmark: 3,
      contents: "본문",
      starGazing: 10,
    },
    {
      id: 1,
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      bookmark: 3,
      contents: "본문",
      starGazing: 10,
    },
    {
      id: 1,
      title: "제목",
      address: "대구시",
      img: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg",
      bookmark: 3,
      contents: "본문",
      starGazing: 10,
    },
  ];
  const [boardList, setBoardList] = React.useState();

  React.useEffect(() => {
    apis
      .getMainBoardAX()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <React.Fragment>
      <StyldMain>
        <VisualBox url={video}>
          <span />
          <h3 className="visualText">
            밤하늘 야경 명당 캠핑장 <br />
            실시간 별자리 찾기
          </h3>
          <img src={arrow} alt="scroll down" />
        </VisualBox>
        <ContentBox>
          <h3>별보기 좋은 캠핑장</h3>
          <ul>
            {test_card_list.map((l, idx) => {
              return (
                <Card key={idx}>
                  <ImageBox>
                    <Address>
                      <img src={ic_map} alt="address icon" />
                      <p>{l.address}</p>
                    </Address>
                    <img src={l.img} alt="camp" className="campImage" />
                  </ImageBox>
                  <div className="contentBox">
                    <CardContent>
                      <h3>{l.title}</h3>
                      <p>{l.contents}</p>
                    </CardContent>
                    <CardEtcBox>
                      <div className="starGazing">
                        <img src={ic_star} alt="star gazing icon" />{" "}
                        <p>관측지수</p>
                        <span className="openSans">{l.starGazing}</span>
                      </div>
                      <div className="bookmark">
                        <img src={ic_bookmark_off} alt="bookmark" />
                        <p className="openSans">{l.bookmark}</p>
                      </div>
                    </CardEtcBox>
                  </div>
                </Card>
              );
            })}
          </ul>
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

  .visualText {
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

  & > h3 {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
  }
  ul {
    display: flex;
    width: 100%;
    gap: 24px;
    margin-top: 24px;
  }
`;

const Card = styled.li`
  width: 100%;
  height: 482px;
  border-radius: 10px;
  overflow: hidden;
  background: #303136;
  display: flex;
  flex-direction: column;
  .contentBox {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const ImageBox = styled.div`
  position: relative;
  .campImage {
    width: 100%;
    height: 288px;
    object-fit: cover;
  }
`;
const Address = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 28px;
  display: flex;
  padding: 5px 12px 5px 8px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 14px;
  top: 20px;
  left: 20px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  p {
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
  }
`;

const CardContent = styled.section`
  padding: 28px 20px 0;
  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
  }

  p {
    font-size: 16px;
    line-height: 18px;
    color: #cccccc;
    margin-top: 10px;
  }
`;

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

export default Main;
