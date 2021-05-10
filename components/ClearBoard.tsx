import { Actions, useStore } from "./Store";
import { getLocalStorage, clearBoardFromLocalStorage } from "../utils";
import styled from "styled-components";
import { useState, useEffect } from "react";

const ClearButton = styled.img.attrs({ role: "button", tabIndex: 0 })`
  height: 35px;
  width: 35px;
  margin: 0;

  :hover {
    cursor: pointer;
  }
`;

export default function ClearBoard({ board }) {
  const { dispatch } = useStore();
  const [showClear, setShowClear] = useState(false);
  
  useEffect(() => {
    const storedData = getLocalStorage();
    if (storedData[board.id] && storedData[board.id].answers && storedData[board.id].answers.length) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }, [board]);

  const onClickClearBoard = () => {
    const cleanBoard = clearBoardFromLocalStorage(board.id);

    dispatch({
      type: Actions.HydrateBoard,
      payload: { board: cleanBoard },
    });
  };

  return showClear && <ClearButton
      title="נקה לוח"
      alt="נקה לוח"
      onClick={onClickClearBoard}
      onKeyPress={onClickClearBoard}
      src="/images/clear-board.svg"
    />;
}
