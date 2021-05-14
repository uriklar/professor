import { Actions, useStore } from "./Store";
import { clearBoardFromLocalStorage } from "../utils";
import styled from "styled-components";
import { useState, useEffect } from "react";

const ClearButton = styled.div.attrs({ role: "button", tabIndex: 0 })`
  font-size: 24px;
  margin-left: 8px;

  :hover {
    cursor: pointer;
  }
`;

export default function ClearBoard({ board }) {
  const {
    dispatch,
    state: { answers },
  } = useStore();
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    if (answers?.length) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }, [answers?.length]);

  const onClickClearBoard = () => {
    const cleanBoard = clearBoardFromLocalStorage(board.id);

    dispatch({
      type: Actions.HydrateBoard,
      payload: { board: cleanBoard },
    });
  };

  return (
    showClear && (
      <ClearButton
        title="נקה לוח"
        onClick={onClickClearBoard}
        onKeyPress={onClickClearBoard}
      >
        🔄
      </ClearButton>
    )
  );
}
