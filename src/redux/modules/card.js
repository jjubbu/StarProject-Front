import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../lib/axios";

const initialState = {
  list: [],
  paging: { currentPage: 1, maxPage: 0, dataSize: 0 },
};

// Action Types

const SET_CARD = "SET_CARD";
const SET_INFINITY_CARD = "SET_INFINITY_CARD";
const SET_SEARCHLIST = "SET_SEARCHLIST";
const SET_PAGE = "SET_PAGE";

// Action creators

const setInfinityCard = createAction(SET_INFINITY_CARD, (card_list) => ({
  card_list,
}));
const setCard = createAction(SET_CARD, (card) => ({ card }));
const setPage = createAction(SET_PAGE, (pageInfo) => ({ pageInfo }));
const setSearchList = createAction(SET_SEARCHLIST, (search_list) => ({
  search_list,
}));
// initial state

// middleware
const setPageDB = (sort, cityName, offset) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort, cityName, offset)
      .then((res) => {
        const current_page = res.data.data.currentPage;
        const max_page = res.data.data.maxPage;
        const data_size = res.data.data.dataSize;

        const paging = {
          currentPage: current_page,
          maxPage: max_page,
          dataSize: data_size,
        };

        dispatch(setPage(paging));
      })
      .catch((err) => {
        window.alert("페이지 정보를 가져올 수 없습니다.");
        return err;
      });
  };
};

const getSearchListDB = (sort, cityName, offset) => {
  return function (dispatch, getState, { history }) {
    apis
      .getCardAX(sort, cityName, offset)
      .then((res) => {
        const cardList = res.data.data.dataList;
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
        setTimeout(500);
      })
      .catch((err) => {
        window.alert("포스트 정보를 가져올 수 없습니다 ");
      });
  };
};

// reducer

export default handleActions(
  {
    [SET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.paging = action.payload.pageInfo;
      }),

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
  },
  initialState
);

// action creator export
const actionCreators = {
  setCard,
  setPage,
  getCardDB,
  getInfinityScrollCardDB,
  getSearchListDB,
  setPageDB,
};

export { actionCreators };
