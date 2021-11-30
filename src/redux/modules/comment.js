import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import "moment";
// import moment from "moment";
import { actionCreators as loginCheckAction } from "./login";

//Action 타입
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

//Action 생성자
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentDB = (id) => {
  return function (dispatch, getState, { history }) {
    // dispatch(loginCheckAction.isLoginMW());
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentDB,
  setComment,
  addComment,
};

export { actionCreators };
