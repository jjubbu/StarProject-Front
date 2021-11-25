import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as starAction } from "./star";

const initialState = {
  user_location: {
    lat: "",
    lon: "",
  },
};

const USER_LOCATION = "USER_LOCATION";

const userLocation = createAction(USER_LOCATION, (object) => ({
  object,
}));

const userLocationMW = (page) => {
  return async function (dispatch) {
    dispatch(starAction.loading({ weather: true, notice: true }));

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (x) => {
      console.log("success");
      const position = x.coords;
      const lat = position.latitude;
      const lon = position.longitude;
      const location = { lat: lat, lon: lon };
      console.log("redux user location:::", location);
      dispatch(userLocation(location));

      if (page === "star") {
        const date = new Date();
        const hour = date.getHours();
        let hourText = String(
          (Number(hour) < 10 ? "0" + String(hour) : String(hour)) + "00"
        );

        dispatch(starAction.starWeatherMW(lat, lon, hourText));
        dispatch(starAction.starNoticeMW(lat, lon));
      }
    };
    const error = (x) => {
      console.log(x.code + ":::" + x.message);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("확인할 수 없다 ㅠㅠ");
    }
  };
};

export default handleActions(
  {
    [USER_LOCATION]: (state, action) =>
      produce(state, (draft) => {
        draft.user_location = action.payload.object;
      }),
  },
  initialState
);

export const actionCreators = {
  userLocationMW,
};
