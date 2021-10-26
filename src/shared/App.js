import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route } from "react-router";
import { history } from "../redux/configureStore";
import Main from "../pages/Main";
function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
    </ConnectedRouter>
  );
}

export default App;
