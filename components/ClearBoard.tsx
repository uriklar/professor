import { Actions, useStore } from "./Store";
import { clearBoardFromLocalStorage } from "../utils";
import styled from "styled-components";

const ClearButton = styled.img.attrs({ role: "button", tabIndex: 0 })`
  height: 35px;
  width: 35px;
  margin: 0;

  :hover{
    cursor: pointer;
  }
`

export default function ClearBoard({ id }) {
  const { dispatch } = useStore();

  const onClickClearBoard = () => {
    const cleanBoard = clearBoardFromLocalStorage(id);

    dispatch({
      type: Actions.HydrateBoard,
      payload: { board: cleanBoard },
    });
  };

  return (
    <ClearButton
      title="נקה לוח"
      alt="נקה לוח"
      onClick={onClickClearBoard}
      onKeyPress={onClickClearBoard}
      src="/images/clear-board.svg"
    />
  );
}
