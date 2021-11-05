import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { api } from "../../shared/apis";

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
  like: 3,
  contents: "본문",
  modifiedAt: "수정일",
};

// middleware

const getCardDB = (
  id,
  writer,
  title,
  주소,
  img,
  like,
  contents,
  modifiedAt
) => {
  return function (dispatch, getState, { history }) {
    api
      .get("/card", {
        id: id,
        writer: writer,
        title: title,
        주소: 주소,
        img: img,
        like: like,
        contents: contents,
        modifiedAt: modifiedAt,
      })
      .then((res) => {
        console.log(res);
        const cardList = res.data;
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

// reducer

export default handleActions(
  {
    [SET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.card_list;
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
};

export { actionCreators };
