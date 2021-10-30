import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route } from "react-router";
import { history } from "../redux/configureStore";
import Main from "../pages/Main";
<<<<<<< Updated upstream
import MainCommunityDeatail from "../pages/MainCommunityDeatail";
import MainMapDetail from "../pages/MainMapDetail";
=======
import MainMapDetail from "../pages/MainMapDetail";
import MainCommunityDetail from "../pages/MainCommunityDetail";
>>>>>>> Stashed changes

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
<<<<<<< Updated upstream
      <Route path="/" exact component={MainCommunityDeatail} />
      <Route path="/detail?boardId=3" exact component={MainMapDetail} />
=======
      <Route path="/map/detail" exact component={MainMapDetail} />
      <Route path="/community/detail" exact component={MainCommunityDetail} />
>>>>>>> Stashed changes
    </ConnectedRouter>
  );
}

export default App;
