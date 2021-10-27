import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import Main from "../pages/Main";
// import MainCommunityDeatail from "../pages/MainCommunityDeatail";
import MainMapDetail from "../pages/MainMapDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import { history } from "../redux/configureStore";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
      {/* <Route path="/" exact component={MainCommunityDeatail} /> */}
      <Route path="/detail?boardId=3" exact component={MainMapDetail} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </ConnectedRouter>
  );
}

export default App;
