
//로그인 하면 유저네임, is_login boolean 변경
//회원가입은 여기 말구 밖에서. 미들웨어 안씀.
import {Cookies} from "react-cookie";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";

import { apis } from "../../lib/axios";

const initialState = {
    is_login:false
}

const CHECK_LOGIN = "CHECK_LOGIN";

const checkLogin = createAction(CHECK_LOGIN,(boolean)=>({boolean}));

const checkLoginMW = ()=>{
  return function (dispatch, getState,{history}){
    const cookies = new Cookies();
    const token = cookies.get("token");

    if(token !== undefined){
      apis.loginCheckAX().then((response)=>{
        if(response.data === "success"){
          dispatch(checkLogin(true));
        }else{
          dispatch(checkLogin(false));
        }
      })
    }else{
      dispatch(checkLogin(false));
    }
  }
}



export default handleActions(
    {
        [CHECK_LOGIN]: (state, action) =>
        produce(state, (draft) => {
          draft.is_login = action.payload.boolean;
        }),
    },
    initialState
  );

  export const actionCreators = {
    checkLogin,
    checkLoginMW,
 
  };
  