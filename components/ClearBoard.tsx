import { Actions, useStore } from "./Store";
import { getLocalStorage, clearLocalStorage } from "../utils";

export default function ClearBoard({ id }) {
  const { dispatch } = useStore();

  const onClickClearBoard = () => {
    const boardStorage = getLocalStorage(id);
    const cleanBoard = { ...boardStorage, answers: [] };

    clearLocalStorage(id);

    dispatch({
      type: Actions.HydrateBoard,
      payload: { board: cleanBoard },
    });
  };

  return (
    <img
      className="clear-board-icon"
      title="נקה לוח"
      alt="נקה לוח"
      onClick={onClickClearBoard}
      src="/images/clear-board.svg"
    />
  );
}
