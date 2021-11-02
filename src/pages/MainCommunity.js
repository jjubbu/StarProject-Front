import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid } from "../elements";

// redux
import { actionCreators as postActions } from "../redux/modules/card";
import { useSelector, useDispatch } from "react-redux";

const MainCommunity = (props) => {
  const card_list = useSelector((state) => state.card.list);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Wrapper>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  overflow: scroll;
`;
const Container = styled.div`
  /* background-color : gray; */
  justify-content: center;
`;

export default MainCommunity;
