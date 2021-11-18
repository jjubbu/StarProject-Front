import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { api } from "../../shared/apis";

// Action Types

const SET_LIKE = "SET_LIKE";
const CHANGE_LIKE = "CHANE_LIKE";

// Action creators

const setLike = createAction(SET_LIKE, (like_list) => ({ like_list }));
const changeLike = createAction(CHANGE_LIKE, (likeStatus) => ({
  likeStatus,
}));

// initial state

const initialState = {
  list: [],
};

// middleware

const getLikeDB = (cardId, likeCheck, likeCount) => {
  return function (dispatch, getState, { history }) {
    api
      .get("/like", {
        id: cardId,
        likeCheck: likeCheck,
        likeCount: likeCount,
      })
      .then((res) => {
        console.log(res);
        const likeList = res.data;
        console.log(likeList);
        dispatch(setLike(likeList));
      })
      .catch((err) => {
        window.alert("좋아요 정보를 가져올 수 없습니다");
        console.log(err);
        return err;
      });
  };
};

// reducer

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.card_list;
        console.log(draft.list);
      }),

    // [ADD_CARD]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export

const actionCreators = {
  getLikeDB,
};

export { actionCreators };
