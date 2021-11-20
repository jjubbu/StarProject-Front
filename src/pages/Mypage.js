import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import styled from "styled-components";
import { apis } from "../lib/axios";
import ic_profile from "../img/ic_profile.svg";

const Mypage = ({ history, match }) => {
  const is_login = useSelector((state) => state.login.is_login);
  const dispatch = useDispatch();

  const deleteAccount = () => {
    apis
      .deleteAccountAX()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log();
  };

  const getPostDetail = () => {
    apis.getPostDetailAX().then((response) => {
      console.log(response);
    });
    history.push(`/detail/:id`);
  };

  const getMyList = () => {
    apis.getMyListAX().then((response) => {
      console.log(response);
    });
  };

  const putUserInfo = () => {
    apis.putUserInfoAX().then((response) => {
      console.log(response);
    });
    history.push(`user/edit`);
  };

  const getMyBookmark = () => {
    apis
      .getMyBookmarkAX()
      .then((response) => {
        console.log("bookmark", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    dispatch(textLogo(false));
    getMyList();
    getMyBookmark();
  }, []);

  return (
    <React.Fragment>
      <MypageStyled className="CommonPageStyle">
        <UserProfile>
          <img src={ic_profile} alt="user profile" />
          <div className="infoText">
            <h3>닉네임님</h3>
            <p>aaa@gmail.com</p>
          </div>
          <div className="buttonBox">
            <button onClick={putUserInfo}>내 정보 수정</button>
            <button onClick={deleteAccount}>회원탈퇴</button>
          </div>
        </UserProfile>
        <div className="list">
          <ListBox>
            <h3 className="title">북마크한 글(4)</h3>
            <ul>
              <ListStyled>
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg"
                  alt="bookmark"
                />
                <div>
                  <h3>동화조이캠핑장</h3>
                  <p>
                    컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠
                  </p>
                </div>
              </ListStyled>
              <ListStyled>
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg"
                  alt="bookmark"
                />
                <div>
                  <h3>동화조이캠핑장</h3>
                  <p>컨텐츠</p>
                </div>
              </ListStyled>
              <ListStyled>
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg"
                  alt="bookmark"
                />
                <div>
                  <h3>동화조이캠핑장</h3>
                  <p>컨텐츠</p>
                </div>
              </ListStyled>
            </ul>
          </ListBox>
          <ListBox>
            <h3 className="title">내가 쓴 글(4)</h3>
            <ul onClick={getPostDetail}>
              <ListStyled>
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg"
                  alt="bookmark"
                />
                <div>
                  <h3>동화조이캠핑장</h3>
                  <p>컨텐츠</p>
                </div>
              </ListStyled>
            </ul>
          </ListBox>
        </div>
      </MypageStyled>
    </React.Fragment>
  );
};

const MypageStyled = styled.div`
  height: fit-content;
  display: flex;
  gap: 24px;
  margin-bottom: 40px;

  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const UserProfile = styled.div`
  width: 32%;
  height: fit-content;
  background: #303136;
  border-radius: 10px;
  padding: 80px 58px;
  text-align: center;
  img {
    width: 120px;
    height: 120px;
  }
  .infoText {
    margin: 24px 0;
    h3 {
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
    }
    p {
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      margin-top: 2px;
    }
  }
  .buttonBox {
    display: flex;
    gap: 8px;
    button {
      flex: 1;
      padding: 11px 0 10px;
      background: #18191e;
      border-radius: 4px;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #fff;
      border: none;
    }
  }
`;

const ListBox = styled.section`
  background: #303136;
  border-radius: 10px;
  padding: 28px;

  .title {
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: #666;
      margin: 20px 0 28px;
    }
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 28px;
    min-height: 88px;
  }
`;
const ListStyled = styled.li`
  display: flex;
  width: 100%;
  gap: 20px;
  img {
    width: 88px;
    height: 88px;
    border-radius: 10px;
    object-fit: cover;
  }
  div {
    h3 {
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
    }
    p {
      margin-top: 8px;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #eeeeee;
    }
  }
`;

export default Mypage;
