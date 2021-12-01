import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../lib/axios";

const initialState = {
  list: [],
};

const SET_CARD = "SET_CARD";

const setCard = createAction(SET_CARD, (card) => ({ card }));

const getCardDB = (sort, cityName, offset) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort, cityName, offset)
      .then((res) => {
        const searchList = res.data.data.dataList;
        dispatch(setCard(searchList));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
      });
  };
};

export default handleActions(
  {
    [SET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.card;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setCard,
  getCardDB,
};

export { actionCreators };
