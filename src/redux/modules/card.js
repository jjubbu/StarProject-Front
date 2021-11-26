import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { api } from "../../shared/apis";
import { apis } from "../../lib/axios";

import { actionCreators as loginCheckAction } from "./login";

// Action Types

const ADD_CARD = "ADD_CARD";
const SET_CARD = "SET_CARD";
const SET_LIKE = "SET_LIKE";
const SET_BOOKMARK = "SET_BOOKMARK";
const SET_INFINITY_CARD = "SET_INFINITY_CARD";
const SET_PAGE = "SET_PAGE";
const SET_SEARCHLIST = "SET_SEARCHLIST";

// Action creators

const setInfinityCard = createAction(
  SET_INFINITY_CARD,
  (card_list, paging) => ({
    card_list,
    paging,
  })
);
const setCard = createAction(SET_CARD, (card, paging) => ({ card, paging }));

const setLike = createAction(SET_LIKE, (likeInfo) => ({ likeInfo }));
const setBookmark = createAction(SET_BOOKMARK, (bookmarkCheck) => ({
  bookmarkCheck,
}));
const setPage = createAction(SET_PAGE, (pageInfo) => ({ pageInfo }));
const setSearchList = createAction(SET_SEARCHLIST, (search_list, paging) => ({
  search_list,
  paging,
}));
// initial state

const initialState = {
  list: [],
  likeInfo: [],
  bookmarkCheck: [],
  paging: { currentPage: null, maxPage: null, dataSize: null },
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

        const paging = {
          currentPage: res.data.data.currentPage,
          maxPage: res.data.data.maxPage,
          dataSize: res.data.data.dataSize,
        };

        dispatch(setSearchList(cardList, paging));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
        console.log(err);
        return err;
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
        // console.log(searchList);

        const paging = {
          currentPage: res.data.data.currentPage,
          maxPage: res.data.data.maxPage,
          dataSize: res.data.data.dataSize,
        };

        dispatch(setCard(searchList, paging));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
        console.log(err);
        return err;
      });
  };
};

const getInfinityScrollCardDB = (sort, cityName, offset) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort, cityName, offset)
      .then((res) => {
        console.log(res);
        const cardList = res.data.data.dataList;
        console.log(cardList);

        const paging = {
          currentPage: res.data.data.currentPage,
          maxPage: res.data.data.maxPage,
          dataSize: res.data.data.dataSize,
        };

        dispatch(setInfinityCard(cardList, paging));
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
        console.log(err);
        return err;
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
        console.log(error);
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
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
        console.log(error);
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
};

// const getCardDB = (
//   id,
//   writer,
//   title,
//   address,
//   img,
//   contents,
//   modifiedAt,
//   likeCheck,
//   likeCount
// ) => {
//   return function (dispatch, getState, { history }) {
//     api
//       .get("/community/list?sort=star", {
//         id: id,
//         writer: writer,
//         title: title,
//         address: address,
//         img: img,
//         contents: contents,
//         modifiedAt: modifiedAt,
//         likeCheck: likeCheck,
//         likeCount: likeCount,
//       })
//       .then((res) => {
//         console.log(res);
//         const cardList = res.data.data.dataList;
//         console.log(cardList);
//         dispatch(setCard(cardList));
//       })
//       .catch((err) => {
//         window.alert("포스트 정보를 가져올 수 없습니다 ");
//         console.log(err);
//         return err;
//       });
//   };
// };

// reducer

export default handleActions(
  {
    [SET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.card;
        draft.paging = action.payload.paging;
      }),

    [SET_SEARCHLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.search_list;
        draft.paging = action.payload.paging;
      }),

    [SET_INFINITY_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.concat(...action.payload.card_list);
        console.log(action.payload.card_list);
        console.log(draft.list);
        draft.paging = action.payload.paging;
      }),

    [SET_LIKE]: (state, action) =>
      // 배열에서 몇 번째에 있는 지 찾은 다음, setLike action에서 가져온 값으로 바꾸기
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
      // 배열에서 몇 번째에 있는 지 찾은 다음, setLike action에서 가져온 값으로 바꾸기
      produce(state, (draft) => {
        draft.bookmarkCheck = action.payload.bookmarkCheck;
        console.log(draft.bookmarkCheck);
        let idx = draft.list.findIndex(
          (p) => p.id === action.payload.bookmarkCheck.cardId
        );
        draft.list[idx].bookmarkCheck =
          action.payload.bookmarkCheck.bookmarkCheck;
      }),

    // [ADD_CARD]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export

const actionCreators = {
  setCard,
  getCardDB,
  postLikeDB,
  postBookmarkDB,
  getInfinityScrollCardDB,
  getSearchListDB,
};

export { actionCreators };
