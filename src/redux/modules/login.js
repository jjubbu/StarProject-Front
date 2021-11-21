//로그인 하면 유저네임, is_login boolean 변경
//회원가입은 여기 말구 밖에서. 미들웨어 안씀.
import { Cookies } from "react-cookie";
import produce from "immer";
import { apis } from "../../lib/axios";
import { createAction, handleActions } from "redux-actions";

const initialState = {
  is_login: false,
  user_info: {
    nickname: "",
    id: "",
  },
};

const IS_LOGIN = "IS_LOGIN";
const USER_INFO = "USER_INFO";

const isLogin = createAction(IS_LOGIN, (boolean) => ({ boolean }));
const setUserInfo = createAction(USER_INFO, (list) => ({ list }));

const isLoginMW = () => {
  return async function (dispatch, getState, { history }) {
    const cookie = new Cookies();
    const token = await cookie.get("token");
    const state = getState().login.is_login;
    console.log("token:::", token);
    if (token !== undefined) {
      apis
        .loginCheckAX()
        .then((response) => {
          console.log("login check:::", response.data);
          const data = response.data;
          if (data.code === 500) {
            cookie.remove("token");
            if (state) {
              dispatch(isLogin(false));
              alert(`"login check ax" ${data.msg}`);
            }
          } else if (data.code === 200) {
            dispatch(isLogin(true));
            dispatch(setUserInfo(data.data));
            console.log("로그인 유지!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (token === undefined) {
      dispatch(isLogin(false));
    }
  };
};

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
  },
  initialState
);

export const actionCreators = {
  isLogin,
  setUserInfo,
  isLoginMW,
};
