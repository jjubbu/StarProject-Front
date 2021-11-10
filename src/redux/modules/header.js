import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const initialState = {
  textLogo: true,
};

const TEXT_LOGO = "TEXT_LOGO";

export const textLogo = createAction(TEXT_LOGO, (boolean) => ({ boolean }));

export default handleActions(
  {
    [TEXT_LOGO]: (state, action) =>
      produce(state, (draft) => {
        draft.textLogo = action.payload.boolean;
      }),
  },
  initialState
);
