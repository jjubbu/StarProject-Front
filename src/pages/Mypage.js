import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import { textLogo } from "../redux/modules/header";
import styled from "styled-components";
import { apis } from "../lib/axios";
import ic_profile from "../img/ic_profile.svg";
import ic_logo from "../img/ic_logo.svg";

import { actionCreators as loginCheckAction } from "../redux/modules/login";

const Mypage = ({ history, match }) => {
  const is_login = useSelector((state) => state.login.is_login);
  const user_info = useSelector((state) => state.login.user_info);
  const [myList, setMyList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [page, setPage] = useState({ bookmark: 1, myPost: 1 });
  const [maxPage, setMaxPage] = useState({ bookmark: 1, myPost: 1 });
  const [dataSize, setDataSize] = useState({ bookmark: 0, myPost: 0 });

  const dispatch = useDispatch();

  const deleteAccount = () => {
    const cookie = new Cookies();
    apis
      .deleteAccountAX()
      .then((response) => {
        if (response.data.code === 200) {
          alert("회원탈퇴 완료");
          cookie.remove("token");
          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMyList = (offset) => {
    apis
      .getMyListAX(offset)
      .then((response) => {
        const data = response.data.data;
        setMyList((prev) => [...prev, data.dataList]);
        setMaxPage((prev) => ({ ...prev, myPost: data.maxPage }));
        setDataSize((prev) => ({ ...prev, myPost: data.dataSize }));
        setTimeout(500);
        console.log("my list:::", myList.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editUserInfo = () => {
    history.push(`/user/edit`);
  };

  const getMyBookmark = (offset) => {
    apis
      .getMyBookmarkAX(offset)
      .then((response) => {
        const data = response.data.data;
        console.log("data:::", data);
        setBookmarkList((prev) => [...prev, data.dataList]);
        setMaxPage((prev) => ({ ...prev, bookmark: data.maxPage }));
        setDataSize((prev) => ({ ...prev, bookmark: data.dataSize }));

        setTimeout(500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const prevButton = (e) => {
    const name = e.target.name;
    const num = page[name] - 1;
    if (num >= 1) {
      setPage((prev) => ({ ...prev, [name]: num }));
      if (name === "myPost") {
        getMyList(num);
      } else {
        getMyBookmark(num);
      }
    }
  };
  const nextButton = (e) => {
    const name = e.target.name;
    const num = page[name] + 1;
    if (num <= maxPage[name]) {
      setPage((prev) => ({ ...prev, [name]: num }));
      if (name === "myPost") {
        getMyList(num);
      } else {
        getMyBookmark(num);
      }
    }
  };

  React.useEffect(() => {
    console.log("user info:::", user_info);
    dispatch(loginCheckAction.isLoginMW());
    setTimeout(500);
    // if (!is_login) {
    //   alert("로그인을 해주세요!");
    //   history.push("/login");
    //   return;
    // }
    dispatch(textLogo(false));
    getMyList(1);
    getMyBookmark(1);
  }, []);

  return (
    <React.Fragment>
      <MypageStyled className="CommonPageStyle">
        <UserProfile>
          <img src={ic_profile} alt="user profile" />
          <div className="infoText">
            <h3>{user_info.nickname}님</h3>
            <p>{user_info.username}</p>
          </div>
          <div className="buttonBox">
            <button onClick={editUserInfo}>내 정보 수정</button>
            <button onClick={deleteAccount}>회원탈퇴</button>
          </div>
        </UserProfile>
        <div className="list">
          <ListBox>
            <div className="boxHeader">
              <h3 className="title">북마크한 글({dataSize.bookmark})</h3>
              <div name="bookmark" className="buttonBox">
                <button name="bookmark" onClick={prevButton} className="prev">
                  prev
                </button>
                {page.bookmark}/{maxPage.bookmark === 0 ? 1 : maxPage.bookmark}
                <button name="bookmark" onClick={nextButton} className="next">
                  next
                </button>
              </div>
            </div>

            {dataSize.bookmark ? (
              <ul>
                {bookmarkList[page.bookmark - 1]?.map((l, idx) => {
                  return (
                    <ListStyled
                      key={idx}
                      onClick={() => {
                        history.push(`/detail/${l.id}`);
                      }}
                    >
                      <img src={l.img !== "" ? l.img : ic_logo} alt="my post" />
                      <div>
                        <h3>{l.title}</h3>
                        <p
                          dangerouslySetInnerHTML={{ __html: l.contents }}
                          className="contents"
                        ></p>
                      </div>
                    </ListStyled>
                  );
                })}
              </ul>
            ) : (
              <h3 className="empty">북마크한 글이 없습니다.</h3>
            )}
          </ListBox>
          <ListBox>
            <div className="boxHeader">
              <h3 className="title">내가 쓴 글({dataSize.myPost})</h3>
              <div name="myPost" className="buttonBox">
                <button name="myPost" onClick={prevButton} className="prev">
                  prev
                </button>
                {page.myPost}/{maxPage.myPost === 0 ? 1 : maxPage.myPost}
                <button name="myPost" onClick={nextButton} className="next">
                  next
                </button>
              </div>
            </div>
            <ul>
              {dataSize.myPost > 0 ? (
                myList[page.myPost - 1]?.map((l, idx) => {
                  return (
                    <ListStyled
                      key={idx}
                      onClick={() => {
                        history.push(`/detail/${l.id}`);
                      }}
                    >
                      <img src={l.img !== "" ? l.img : ic_logo} alt="my post" />
                      <div>
                        <h3>{l.title}</h3>
                        <p
                          dangerouslySetInnerHTML={{ __html: l.content }}
                          className="contents"
                        ></p>
                      </div>
                    </ListStyled>
                  );
                })
              ) : (
                <h3 className="empty">내가 쓴 글이 없습니다.</h3>
              )}
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
  .boxHeader {
    display: flex;
    border-bottom: 1px solid #666;
    padding-bottom: 20px;
  }
  .title {
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
  }
  .buttonBox {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    color: #eee;
    gap: 2px;
    button {
      width: 24px;
      height: 24px;
      position: relative;
      text-indent: -9999px;
      border: none;
      background: none;
      &::after {
        content: "";
        position: absolute;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
      }
      &.prev::after {
        border-right: 7px solid #eee;
        border-left: 7px solid transparent;
        right: 8px;
      }
      &.next::after {
        border-right: 7px solid transparent;
        border-left: 7px solid #eee;
        left: 8px;
      }
    }
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 28px;
    min-height: 88px;
    margin-top: 28px;
  }
  .empty {
    width: 100%;
    height: 260px;
    text-align: center;
    line-height: 260px;
    font-weight: normal;
    font-size: 18px;
    color: #eee;
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
    .contents {
      margin-top: 8px;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      color: #eeeeee;

      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* 텍스트를 자를 때 원하는 단위 ex) 3줄 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      img {
        display: none;
      }
      br {
        display: none;
      }
      iframe {
        display: none;
      }
    }
  }
`;

export default Mypage;
