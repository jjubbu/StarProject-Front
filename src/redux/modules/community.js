import produce from "immer";
import { apis } from "../../lib/axios";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as sortAction } from "./card";

const initialState = {
  sort: "star",
};

const CHANGE_SORT = "CHANGE_SORT";

const changeSort = createAction(CHANGE_SORT, (text) => ({ text }));

export const changeSortMW = (text) => {
  return async function (dispatch, getState, { history }) {
    dispatch(changeSort(text));
    const sort = getState().community.sort;
    dispatch(sortAction.getCardDB(sort, null, 1));
  };
};

export default handleActions(
  {
    [CHANGE_SORT]: (state, action) =>
      produce(state, (draft) => {
        draft.sort = action.payload.text;
      }),
  },
  initialState
);
