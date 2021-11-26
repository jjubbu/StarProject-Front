import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const initialState = {
  data: {
    title: "",
    content: "",
    address: "",
    id: "",
  },
};

const ADD_DATA = "ADD_DATA";
const DELETE_DATA = "DELETE_DATA";

const addData = createAction(ADD_DATA, (object) => ({ object }));
const deleteData = createAction(DELETE_DATA, () => ({}));

export default handleActions(
  {
    [ADD_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.object;
      }),
    [DELETE_DATA]: (state) =>
      produce(state, (draft) => {
        const emptyObject = {
          title: "",
          content: "",
          address: "",
          id: "",
        };
        draft.data = emptyObject;
      }),
  },
  initialState
);

export const actionCreators = {
  addData,
  deleteData,
};
