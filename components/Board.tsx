import Grid from "../components/Grid";
import Store from "../components/Store";
import { IBoard } from "../types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BoardNavigator from "./BoardNavigator";
import styled from "styled-components";
import BoardList from "./BoardList";
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

export default function Board({ board, ids, showSelect }: Props) {
  const { showToast, closeToast } = useToast();

  return (
    <>
      <Container>
        <Store board={board} ids={ids}>
          <GridContainer>
            <h3>{board.id}</h3>
            <Grid />
            <BoardNavigator />
            <div>Like</div>
          </GridContainer>
          <BoardList ids={ids} board={board} open={showSelect} />
        </Store>
      </Container>
      {/* Toast in case of new board */}
      <dialog className="toast-dialog" open={showToast} style={{ zIndex: 1 }}>
        <p> הלוח נוצר בהצלחה!</p>
        <button onClick={closeToast}>הבנתי, תודה</button>
      </dialog>
    </>
  );
}
