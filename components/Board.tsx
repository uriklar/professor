import Grid from "../components/Grid";
import Store from "../components/Store";
import { IBoard } from "../types";
import React, { useState, useEffect } from "react";
import BoardNavigator from "./BoardNavigator";
import styled from "styled-components";
import BoardList from "./BoardList";
import BoardCreatedDialog from "./BoardCreatedDialog";
import WhatsNew from "./WhatsNew";
import { useRouter } from "next/router";
import { useStore } from "./Store";
//import { MOCK_BOARD } from "../../mocks";
import LikesCounter from "./LikesCounter";

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

function useToast() {
  const [showToast, setShowToast] = useState(false);
  const closeToast = () => setShowToast(false);
  const router = useRouter();

  useEffect(() => {
    const { toast } = router.query;
    if (toast === "new") {
      setShowToast(true);
    }
  }, [router.query]);

  return {
    showToast,
    closeToast,
  };
}
export default function Board({
  board,
  ids,
  showSelect,
  setShowSelect,
}: Props) {
  const { state } = useStore();
  console.log("Board", state);
  return (
    <>
      <Container>
        <Store board={board} ids={ids}>
          <GridContainer>
            <h3>{board.id}</h3>
            <Grid />
            <BoardNavigator />
          </GridContainer>
          <LikesCounter current={board.likes}></LikesCounter>
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
