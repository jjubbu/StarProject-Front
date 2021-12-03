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
import AddEditPost from "../pages/AddEditPost";
import UserInfoEdit from "../pages/UserInfoEdit";
import Mypage from "../pages/Mypage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./font.css";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as tokenCheckAction } from "../redux/modules/login";

function App() {
  const dispatch = useDispatch();
  const [path, setPath] = React.useState();
  history.listen((location) => {
    setPath(location.pathname);
  });
  React.useEffect(() => {
    dispatch(tokenCheckAction.isLoginMW());
    setPath(history.location.pathname);
  }, [dispatch]);
  return (
    <ConnectedRouter history={history}>
      <StyledViewContainer>
        {path === "/community" ? (
          <Route path="/community" exact component={MainCommunity} />
        ) : (
          <React.Fragment>
            <Header />
            <Route path="/" exact component={Main} />
            <Route path="/star" exact component={MainStar} />
            <Route path="/map" exact component={MainMap} />
            <Route path="/post/add" exact component={AddEditPost} />
            <Route path="/post/edit" exact component={AddEditPost} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/user/edit" exact component={UserInfoEdit} />
            <Route path="/mypage" exact component={Mypage} />
            <Footer />
          </React.Fragment>
        )}
      </StyledViewContainer>
    </ConnectedRouter>
  );
}

const StyledViewContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export default App;
