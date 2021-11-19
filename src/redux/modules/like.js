// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";

// // import { api } from "../../shared/apis";
// import { apis } from "../../lib/axios.js";

// // Action Types

// const SET_CARD = "SET_LIKE";
// const CHANGE_LIKE = "CHANGE_LIKE";

// // Action creators

// const setCard = createAction(SET_CARD, (card_list) => ({ card_list }));

// // initial state

// const initialState = {
//   list: [],
// };

// // 좋아요 정보
// const initialLike = {
//   cardId: 3,
//   likeCheck: true,
//   likeCount: 5,
// };

// // const postLikeDB = (id, idx) => {
// //   return function (dispatch, getState, { history }) {
// //     apis
// //       .postLikeAX(id)
// //       .then((res) => {
// //         console.log(res);
// //         const likeCheck = res.data.data.likeCheck;
// //         let newList = [...card_list];
// //         newList[idx].likeCheck = likeCheck;
// //         setCardList(newList);
// //       })
// //       .catch((err) => {
// //         window.alert("좋아요 정보를 가져올 수 없습니다");
// //         console.log(err);
// //         return err;
// //       });
// //   };
// // };

// // reducer

// export default handleActions(
//   {
//     [SET_LIKE]: (state, action) =>
//       produce(state, (draft) => {
//         draft.list = action.payload.like_list;
//         console.log(draft.list);
//       }),

//     // [ADD_CARD]: (state, action) => produce(state, (draft) => {}),
//   },
//   initialState
// );

// // action creator export

// const actionCreators = {
//   postLikeDB,
// };

// export { actionCreators };
