import Grid from "../components/Grid";
import Store from "../components/Store";
import { IBoard } from "../types";
import React from "react";
import BoardNavigator from "./BoardNavigator";
import styled from "styled-components";
import BoardList from "./BoardList";
import BoardCreatedDialog from "./BoardCreatedDialog";
import WhatsNew from "./WhatsNew";
//import { MOCK_BOARD } from "../../mocks";

const Container = styled.main`
  padding: 10px;
  position: relative;
`;

const GridContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export interface Props {
  board: IBoard;
  ids: string[];
  showSelect: boolean;
  setShowSelect: (show: boolean) => void;
}

export default function Board({
  board,
  ids,
  showSelect,
  setShowSelect,
}: Props) {
  return (
    <>
      <Container>
        <Store board={board} ids={ids}>
          <GridContainer>
            <h3>{board.id}</h3>
            <Grid />
            <BoardNavigator />
          </GridContainer>
          <BoardList
            ids={ids}
            board={board}
            open={showSelect}
            onClose={() => setShowSelect(false)}
          />
        </Store>
        <BoardCreatedDialog />
        <WhatsNew />
      </Container>
    </>
  );
}
