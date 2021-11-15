//로그인 하면 유저네임, is_login boolean 변경
//회원가입은 여기 말구 밖에서. 미들웨어 안씀.
import { Cookies } from "react-cookie";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";

import { apis } from "../../lib/axios";

const initialState = {
  is_login: false,
  user_info: {
    nickname: "",
    id: "",
  },
};

const IS_LOGIN = "IS_LOGIN";
const USER_INFO = "USER_INFO";

export const isLogin = createAction(IS_LOGIN, (boolean) => ({ boolean }));
export const setUserInfo = createAction(USER_INFO, (list) => ({ list }));

export default handleActions(
  {
    [IS_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
      }),
    [USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
      }),
  },
  initialState
);
