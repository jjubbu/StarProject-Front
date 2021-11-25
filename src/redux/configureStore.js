import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import login from "./modules/login";
import card from "./modules/card";
import header from "./modules/header";
import star from "./modules/star";
import user from "./modules/user";

//만든 히스토리와 라우터가 연결. 스토어에 브라우저 히스토리가 저장되는 것.
export const history = createBrowserHistory();

//rootreducer
const rootReducer = combineReducers({
  login: login,
  card: card,
  header: header,
  star: star,
  user: user,
  router: connectRouter(history),
});

// middlewares 액션 생성함수 실행 후, 리듀서가 실행되기 전에 미들웨어 청크단계에서 히스토리를 사용하기 위해 즉, 비동기에서
// .then 을 쓸수 있게 하기 위해 설정해준다.
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  // 패키지 가져올때 쓰는것, 로거는 콘솔에 리덕스 스토어 안의 데이터가 뭐가 담기는지 이전상태 이후상태가 찍힌다. if문안에서만 쓰려고
  // require를 씀
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//redux devTools 설정 브라우저일때만 돌아갈 수 있도록 object 넣어줌?
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators,
        // serialize...
      })
    : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
