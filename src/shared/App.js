import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import styled from "styled-components";

import Main from "../pages/Main";
import MainStar from "../pages/MainStar";
import MainMap from "../pages/MainMap";
import MainCommunity from "../pages/MainCommunity";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./font.css";

import { history } from "../redux/configureStore";

function App() {
  return (
    <ConnectedRouter history={history}>
      <StyledViewContainer>
        <Header />
        <Route path="/" exact component={Main} />
        <Route path="/star" exact component={MainStar} />
        <Route path="/map" exact component={MainMap} />
        <Route path="/community" exact component={MainCommunity} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/detail/:id" exact component={Detail} />
        <Footer />
      </StyledViewContainer>
    </ConnectedRouter>
  );
}

const StyledViewContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 24px;
`;

export default App;
