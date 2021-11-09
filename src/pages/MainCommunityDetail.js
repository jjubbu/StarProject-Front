import React from "react";
import MainCommunity from "../components/MainCommunity";

const MainCommunityDetail = (props) => {
  React.useEffect(() => {
    console.log(window.location.pathname);
  }, []);

  return (
    <React.Fragment>
      <div className="CommonPageStyle">
        <MainCommunity />
      </div>
    </React.Fragment>
  );
};

export default MainCommunityDetail;
