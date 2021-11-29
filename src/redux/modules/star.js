import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../lib/axios";

const initialState = {
  star_photo: {},
  star_notice: {},
  star_weather: {},
  star_hot: {
    currentTime: "",
    starList: [],
  },
  loading: {
    photo: true,
    notice: true,
    weather: true,
    hot: true,
  },
};

const STAR_PHOTO = "STAR_PHOTO";
const STAR_NOTICE = "STAR_NOTICE";
const STAR_WEATHER = "STAR_WEATHER";
const STAR_HOT = "STAR_HOT";
const LOADING = "LOADING";

const starPhoto = createAction(STAR_PHOTO, (object) => ({ object }));
const starNotice = createAction(STAR_NOTICE, (object) => ({ object }));
const starWeather = createAction(STAR_WEATHER, (object) => ({ object }));
const starHot = createAction(STAR_HOT, (object) => ({ object }));
const loading = createAction(LOADING, (object) => ({ object }));

const starPhotoMW = () => {
  return async function (dispatch, getState) {
    const photo = getState().star.star_photo;
    if (photo !== {}) {
      dispatch(loading({ photo: false }));
    }
    apis
      .getStarPhotoAX()
      .then((response) => {
        const data = response.data.data;
        dispatch(starPhoto(data));
        dispatch(loading({ photo: false }));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
const starNoticeMW = (lat, lon) => {
  return async function (dispatch, getState) {
    const notice = getState().star.star_notice;
    if (notice !== {}) {
      dispatch(loading({ notice: false }));
    }
    apis
      .getNoticeAX(lat, lon)
      .then((response) => {
        const data = response.data.data;
        const moonrise =
          data.moonrise.slice(0, 2) + ":" + data.moonrise.slice(2, 4);
        const moonset =
          data.moonset.slice(0, 2) + ":" + data.moonset.slice(2, 4);
        const newObject = {
          moonrise: moonrise,
          moonset: moonset,
          starGazing: data.starGazing,
        };
        dispatch(starNotice(newObject));
        dispatch(loading({ notice: false }));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
const starWeatherMW = (lat, lon, hour) => {
  return async function (dispatch, getState) {
    const weather = getState().star.star_weather;
    if (weather !== {}) {
      dispatch(loading({ weather: false }));
    }
    apis
      .getNoticeWeatherAX(lat, lon, hour)
      .then((response) => {
        const data = response.data.data;
        dispatch(starWeather(data));
        dispatch(loading({ weather: false }));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
const starHotMW = () => {
  return async function (dispatch, getState) {
    const hot = getState().star.star_hot;
    if (hot !== {}) {
      dispatch(loading({ hot: false }));
    }
    apis
      .getStarHotAX()
      .then((response) => {
        const data = response.data.data;
        dispatch(starHot(data));
        dispatch(loading({ hot: false }));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export default handleActions(
  {
    [STAR_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.star_photo = action.payload.object;
      }),
    [STAR_NOTICE]: (state, action) =>
      produce(state, (draft) => {
        draft.star_notice = action.payload.object;
      }),
    [STAR_WEATHER]: (state, action) =>
      produce(state, (draft) => {
        draft.star_weather = action.payload.object;
      }),
    [STAR_HOT]: (state, action) =>
      produce(state, (draft) => {
        draft.star_hot = action.payload.object;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        const newObject = { ...draft.loading, ...action.payload.object };
        draft.loading = newObject;
      }),
  },
  initialState
);

export const actionCreators = {
  starPhotoMW,
  starNoticeMW,
  starWeatherMW,
  starHotMW,
  loading,
};
