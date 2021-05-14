import Grid from "../components/Grid";
import Store from "../components/Store";
import { IBoard, ILikes } from "../types";
import React, { useState, useEffect } from "react";
import BoardNavigator from "./BoardNavigator";
import styled from "styled-components";
import BoardList from "./BoardList";
import BoardCreatedDialog from "./BoardCreatedDialog";
import WhatsNew from "./WhatsNew";
import { useRouter } from "next/router";
//import { MOCK_BOARD } from "../../mocks";
import LikesCounter from "./LikesCounter";
import ClearBoard from "./ClearBoard";

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

const BoardTitle = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin-bottom: 6px;
    margin-top: 6px;
  }
`;

export interface Props {
  board: IBoard;
  ids: string[];
  likes: ILikes;
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
  likes,
}: Props) {
  return (
    <>
      <Container>
        <Store board={board} ids={ids} likes={likes}>
          <GridContainer>
            <BoardTitle>
              <ClearBoard board={board} />
              <h3>{board.id}</h3>
            </BoardTitle>
            <LikesCounter />
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
