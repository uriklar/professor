import Head from "next/head";
import Link from "next/link";
import Grid from "../components/Grid";
import Store from "../components/Store";
import { IBoard } from "../types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLocalStorage } from "../utils";
import BoardNavigator from "./BoardNavigator";
import BoardListItem from "./BoardListItem";
//import { MOCK_BOARD } from "../../mocks";

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
      <main>
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

        <Store board={board} ids={ids}>
          <div className="grid-container">
            <h3>{board.id}</h3>
            <Grid />
            <BoardNavigator />
          </div>
        </Store>
      </main>
      {/* Toast in case of new board */}
      <dialog className="toast-dialog" open={showToast}>
        <p> הלוח נוצר בהצלחה!</p>
        <button onClick={closeToast}>הבנתי, תודה</button>
      </dialog>
    </>
  );
}
