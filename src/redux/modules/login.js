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
    if (token !== undefined && token !== "") {
      apis
        .loginCheckAX()
        .then((response) => {
          const data = response.data;
          setTimeout(500);
          if (data.code === 500) {
            cookie.remove("token");
            if (state) {
              dispatch(isLogin(false));
              alert(`토큰이 만료되었습니다.`);
            }
          } else if (data.code === 200) {
            dispatch(isLogin(true));
            dispatch(setUserInfo(data.data));
          }
        })
        .catch((err) => {
          alert(err);
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
