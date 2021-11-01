import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const initialState = {
  userLocation: {
    latitude: "", //위도
    longitude: "", //경도
  },
};

const LOCATION = "LOCATION";

// const saveLocation = createAction(LOCATION,(lat,lon)=>)
