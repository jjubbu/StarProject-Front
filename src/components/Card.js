import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import { history } from "../redux/configureStore";

import ic_map from "../img/map/ic_map.svg";
import ic_profile from "../img/ic_profile.svg";
import ic_heart from "../img/ic_heart.svg";
import ic_heart_on from "../img/ic_heart_on.svg";
import ic_bookmark_off from "../img/ic_bookmark_off.svg";
import ic_bookmark_on from "../img/ic_bookmark_on.svg";
import ic_logo from "../img/ic_logo.svg";

import { useSelector } from "react-redux";
import { apis } from "../lib/axios";

const Card = (props) => {
  const [state, setstate] = React.useState({
    like: false,
    bookmark: false,
    likeCount: 0,
  });
  const is_login = useSelector((state) => state.login.is_login);
  const cardClick = () => {
    history.push(`detail/${props.cardID}`);
  };

  const inApis = (code, name, msg) => {
    const count =
      name === "like"
        ? { likeCount: state.likeCount + (state.like ? -1 : 1) }
        : null;
    code !== 500
      ? setstate((prev) => ({
          ...prev,
          [name]: !state[name],
          ...count,
        }))
      : alert(msg);
  };
  const iconClick = (e) => {
    const name = e.target.getAttribute("name");
    if (!is_login) {
      history.push("/login");
    } else {
      name === "like"
        ? apis.postLikeAX(props.cardID).then((response) => {
            inApis(response.data.code, name, response.data.msg);
          })
        : apis.postBookmarkAX(props.cardID).then((response) => {
            inApis(response.data.code, name, response.data.msg);
          });
    }
    e.stopPropagation();
  };
  React.useEffect(() => {
    setstate({
      like: props.likeCheck,
      bookmark: props.bookmarkCheck,
      likeCount: props.likeCount,
    });
  }, []);

  return (
    <Wrapper onClick={cardClick}>
      <div>
        <ImageArea>
          {props.img ? (
            <img src={props.img} alt="게시글 대표 이미지" />
          ) : (
            <img
              src={ic_logo}
              height="128px"
              alt="logoIcon"
              className="logoIcon"
            />
          )}
        </ImageArea>

        <InfoDiv>
          <img className="ic_heart" src={ic_map} size="5" alt="address icon" />
          <h3>{props.address}</h3>
        </InfoDiv>
      </div>

      <div>
        <div>
          <TitleDiv>{props.title}</TitleDiv>
          <ContentDiv>
            <Text size="16px" lineHeight="30px" color="white">
              {props.contents}
            </Text>
          </ContentDiv>
        </div>
        <DateDiv>{props.modifiedAt}</DateDiv>
        <BottomDiv>
          <div className="profile">
            <img src={ic_profile} alt="ic_profile" />
            <span>{props.writer}</span>
          </div>

          <div className="likeDiv">
            <img
              className="ic_heart_on"
              src={state.like ? ic_heart_on : ic_heart}
              name="like"
              onClick={iconClick}
              alt="ic_heart_on"
            />
            <p className="like">{state.likeCount}</p>

            <div className="bookmarkDiv">
              <img
                className="ic_bookmark_off"
                src={state.bookmark ? ic_bookmark_on : ic_bookmark_off}
                alt="ic_bookmark_off"
                name="bookmark"
                onClick={iconClick}
              />
            </div>
          </div>
        </BottomDiv>
      </div>
    </Wrapper>
  );
};

Card.defaultProps = {};

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  height: 288px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  img {
    object-fit: cover;
    width: 100%;
    height: 288px;
  }
  img.logoIcon {
    width: 128px;
    height: 128px;
  }
  @media only screen and (max-width: 480px) {
    height: 220px;
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

    .ic_heart_on {
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
  min-width: 344px;
  width: 100%;
  height: 40px;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  line-clamp: 3;
  line-height: 20.03px;
  padding: 0 20px;
  margin-top: 16px;
  color: #ffffff;
  p {
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    margin-top: 1px;
    max-height: 80px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  @media only screen and (max-width: 364px) {
    min-width: 100%;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex;
  border-radius: 10px;
  background-color: #303136;
  & > div:first-child {
    height: fit-content;
    position: relative;
  }
  .defaultImage {
    display: flex;
    align-items: center;
    .img {
      width: 285px;
      height: 285px;
    }
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.65);
    transition: all 0.5s;
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

export default Card;
