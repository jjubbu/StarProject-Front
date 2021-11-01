import React from "react";
import {Route} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import styled from "styled-components";

import Star from "../pages/Star";
import CampMap from "../pages/CampMap";
// import MainCommunityDeatail from "../pages/MainCommunityDeatail";
import MainMapDetail from "../pages/MainMapDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Footer from "../components/Footer";

import {history} from "../redux/configureStore";

function App() {
    return (
        <ConnectedRouter history={history}>
            <StyledViewContainer>
                <Route path="/" exact component={Star}/> {/* <Route path="/" exact component={MainCommunityDeatail} /> */}
                <Route path="/map" exact component={CampMap}/>
                <Route path="/detail?boardId=3" exact component={MainMapDetail}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
                <Footer/>
            </StyledViewContainer>
        </ConnectedRouter>
    );
}

const StyledViewContainer = styled.article `
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;
gap:24px;
`

export default App;
