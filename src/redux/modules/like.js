import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { api } from "../../shared/apis";

// Action Types

const ADD_LIKE = "ADD_LIKE";
const SET_LIKE = "SET_LIKE";

// Action creators

const setLike = createAction(SET_LIKE, (like_list) => ({ like_list }));

// initial state
