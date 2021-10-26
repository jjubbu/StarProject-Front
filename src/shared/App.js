import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route } from "react-router";
import { history } from "../redux/configureStore";
import Main from "../pages/Main";
import MainCommunityDeatail from "../pages/MainCommunityDeatail";
import MainMapDetail from "../pages/MainMapDetail";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
      <Route path="/" exact component={MainCommunityDeatail} />
      <Route path="/detail?boardId=3" exact component={MainMapDetail} />
    </ConnectedRouter>
  );
}

export default App;
