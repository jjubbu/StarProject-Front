import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import login from "./modules/login";
import card from "./modules/card";
import header from "./modules/header";
import star from "./modules/star";
import user from "./modules/user";
import edit from "./modules/edit";
import community from "./modules/community";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  login: login,
  card: card,
  header: header,
  star: star,
  user: user,
  edit: edit,
  community: community,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
