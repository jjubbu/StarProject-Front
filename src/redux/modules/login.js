//로그인 하면 유저네임, is_login boolean 변경
//회원가입은 여기 말구 밖에서. 미들웨어 안씀.
import { Cookies } from "react-cookie";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const initialState = {
  is_login: false,
  user_info: {
    nickname: "",
    id: "",
  },
  login_check: false,
};

const IS_LOGIN = "IS_LOGIN";
const USER_INFO = "USER_INFO";
const LOGIN_CHECK = "LOGIN_CHECK";

export const isLogin = createAction(IS_LOGIN, (boolean) => ({ boolean }));
export const setUserInfo = createAction(USER_INFO, (list) => ({ list }));
export const loginCheck = createAction(LOGIN_CHECK, (boolean) => ({ boolean }));

export default handleActions(
  {
    [IS_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
      }),
    [USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.list;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.login_check = action.payload.boolean;
      }),
  },
  initialState
);
