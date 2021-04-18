import Grid from "../components/Grid";
import Store from "../components/Store";
import { IBoard } from "../types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLocalStorage } from "../utils";
import BoardNavigator from "./BoardNavigator";
import BoardListItem from "./BoardListItem";
import styled from "styled-components";
//import { MOCK_BOARD } from "../../mocks";

const Container = styled.main`
  padding: 10px;
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

export default function Board({ board, ids }: Props) {
  const { showToast, closeToast } = useToast();

  const localStorage = getLocalStorage();

  return (
    <>
      <Container>
        <Store board={board} ids={ids}>
          <GridContainer>
            <h3>{board.id}</h3>
            <Grid />
            <BoardNavigator />
          </GridContainer>
          {/* Existing boards */}
          <aside>
            <h3>לוחות קיימים:</h3>
            <ul>
              {ids.map((id) => (
                <BoardListItem
                  key={id}
                  id={id}
                  currentId={board.id}
                  answers={localStorage[id]?.answers}
                />
              ))}
            </ul>
          </aside>
        </Store>
      </Container>
      {/* Toast in case of new board */}
      <dialog className="toast-dialog" open={showToast}>
        <p> הלוח נוצר בהצלחה!</p>
        <button onClick={closeToast}>הבנתי, תודה</button>
      </dialog>
    </>
  );
}
