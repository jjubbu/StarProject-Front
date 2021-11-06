import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const initialState = {
  is_login: false,
};

const IS_LOGIN = "IS_LOGIN";

export const isLogin = createAction(IS_LOGIN, (boolean) => ({ boolean }));

export default handleActions(
  {
    [IS_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
      }),
  },
  initialState
);
