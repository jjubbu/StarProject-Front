import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { api } from "../../shared/apis";
import { apis } from "../../lib/axios";

import { actionCreators as loginCheckAction } from "./login";

// Action Types

const ADD_CARD = "ADD_CARD";
const SET_CARD = "SET_CARD";

// Action creators

const setCard = createAction(SET_CARD, (card_list) => ({ card_list }));
const addCard = createAction(ADD_CARD, (card) => ({ card }));

// initial state

const initialState = {
  list: [],
};
// 카드 하나당 들어가 있어야 하는 정보
const initialCard = {
  id: 1,
  writer: "salmon",
  title: "제목",
  주소: "대구시",
  img: "https://campimage.s3.ap-northeast-2.amazonaws.com/campimage.jpg",
  contents: "본문",
  modifiedAt: "수정일",
};

// middleware

const getCardDB = (sort) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort)
      .then((res) => {
        console.log(res);
        const cardList = res.data.data.dataList;
        console.log(cardList);
        dispatch(setCard(cardList));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
        console.log(err);
        return err;
      });
  };
};

const postLikeDB = (id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loginCheckAction.isLoginMW());
    apis
      .postLikeAX(id)
      .then((res) => {
        console.log(res);
        const cardList = res.data.data;
        console.log(cardList);
        getCardDB(res.data.data);
      })
      .catch((error) => {
        window.alert("좋아요 정보를 가져올 수 없습니다");
        console.log(error);
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
};

// const getCardDB = (
//   id,
//   writer,
//   title,
//   address,
//   img,
//   contents,
//   modifiedAt,
//   likeCheck,
//   likeCount
// ) => {
//   return function (dispatch, getState, { history }) {
//     api
//       .get("/community/list?sort=star", {
//         id: id,
//         writer: writer,
//         title: title,
//         address: address,
//         img: img,
//         contents: contents,
//         modifiedAt: modifiedAt,
//         likeCheck: likeCheck,
//         likeCount: likeCount,
//       })
//       .then((res) => {
//         console.log(res);
//         const cardList = res.data.data.dataList;
//         console.log(cardList);
//         dispatch(setCard(cardList));
//       })
//       .catch((err) => {
//         window.alert("포스트 정보를 가져올 수 없습니다 ");
//         console.log(err);
//         return err;
//       });
//   };
// };

// reducer

export default handleActions(
  {
    [SET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.card_list;
        console.log(draft.list);
      }),

    [ADD_CARD]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export

const actionCreators = {
  setCard,
  addCard,
  getCardDB,
  postLikeDB,
};

export { actionCreators };
