import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { api } from "../../shared/apis";
import { apis } from "../../lib/axios";

import { actionCreators as loginCheckAction } from "./login";

// Action Types

const SET_CARD = "SET_CARD";
const SET_LIKE = "SET_LIKE";
const SET_BOOKMARK = "SET_BOOKMARK";
const SET_INFINITY_CARD = "SET_INFINITY_CARD";
const SET_PAGE = "SET_PAGE";
const SET_SEARCHLIST = "SET_SEARCHLIST";

// Action creators

const setInfinityCard = createAction(SET_INFINITY_CARD, (card_list) => ({
  card_list,
}));
const setCard = createAction(SET_CARD, (card) => ({ card }));

const setLike = createAction(SET_LIKE, (likeInfo) => ({ likeInfo }));
const setBookmark = createAction(SET_BOOKMARK, (bookmarkCheck) => ({
  bookmarkCheck,
}));
const setPage = createAction(SET_PAGE, (pageInfo) => ({ pageInfo }));
const setSearchList = createAction(SET_SEARCHLIST, (search_list) => ({
  search_list,
}));
// initial state

const initialState = {
  list: [],
  likeInfo: [],
  bookmarkCheck: [],
  paging: { currentPage: 1, maxPage: 0, dataSize: 0 },
};

// middleware

const getSearchListDB = (sort, cityName, offset) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort, cityName, offset)
      .then((res) => {
        console.log(res);
        const cardList = res.data.data.dataList;
        console.log(cardList);

        const newPaging = {
          currentPage: res.data.data.currentPage,
          maxPage: res.data.data.maxPage,
          dataSize: res.data.data.dataSize,
        };
        dispatch(setPage(newPaging));
        dispatch(setSearchList(cardList));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
      });
  };
};

const getCardDB = (sort, cityName, offset) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort, cityName, offset)
      .then((res) => {
        console.log("getCardAX", res);
        const searchList = res.data.data.dataList;

        const newPaging = {
          currentPage: res.data.data.currentPage,
          maxPage: res.data.data.maxPage,
          dataSize: res.data.data.dataSize,
        };
        dispatch(setPage(newPaging));
        dispatch(setCard(searchList));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
      });
  };
};

const getInfinityScrollCardDB = (sort, cityName) => {
  return async function (dispatch, getState, { history }) {
    const paging = getState().card.paging;

    apis
      .getCardAX(sort, cityName, paging.currentPage)
      .then((res) => {
        const cardList = res.data.data.dataList;

        const newPaging = {
          currentPage: res.data.data.currentPage,
          maxPage: res.data.data.maxPage,
          dataSize: res.data.data.dataSize,
        };
        dispatch(setPage(newPaging));
        dispatch(setInfinityCard(cardList));

        console.log("무한스크롤 paging:::", paging);
        setTimeout(500);
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
      });
  };
};

const postLikeDB = (id, offset) => {
  return function (dispatch, getState, { history }) {
    dispatch(loginCheckAction.isLoginMW());

    apis
      .postLikeAX(id, offset)
      .then((res) => {
        console.log(res.data.data);
        const newLikeInfo = res.data.data;
        console.log(newLikeInfo);
        dispatch(setLike(newLikeInfo));
      })
      .catch((error) => {
        window.alert("좋아요 정보를 가져올 수 없습니다");
      });
  };
};

const postBookmarkDB = (id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loginCheckAction.isLoginMW());

    apis
      .postBookmarkAX(id)
      .then((res) => {
        console.log(res.data.data);
        const newBookmarkInfo = res.data.data;
        console.log(newBookmarkInfo);
        dispatch(setBookmark(newBookmarkInfo));
      })
      .catch((error) => {
        window.alert("좋아요 정보를 가져올 수 없습니다");
      });
  };
};

// reducer

export default handleActions(
  {
    [SET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.card;
      }),
    [SET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.paging = action.payload.pageInfo;
      }),

    [SET_SEARCHLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.search_list;
      }),

    [SET_INFINITY_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.concat(...action.payload.card_list);
      }),

    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.likeInfo = action.payload.likeInfo;
        console.log(draft.likeInfo);
        let idx = draft.list.findIndex(
          (p) => p.id === action.payload.likeInfo.cardId
        );
        draft.list[idx].likeCheck = action.payload.likeInfo.likeCheck;
        draft.list[idx].likeCount = action.payload.likeInfo.likeCount;
      }),

    [SET_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmarkCheck = action.payload.bookmarkCheck;
        console.log(draft.bookmarkCheck);
        let idx = draft.list.findIndex(
          (p) => p.id === action.payload.bookmarkCheck.cardId
        );
        draft.list[idx].bookmarkCheck =
          action.payload.bookmarkCheck.bookmarkCheck;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setCard,
  setPage,
  getCardDB,
  postLikeDB,
  postBookmarkDB,
  getInfinityScrollCardDB,
  getSearchListDB,
};

export { actionCreators };
