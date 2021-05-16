import Tooltip from "./common/Tooltip";
import { Actions, useStore } from "./Store";
import { clearBoardFromLocalStorage } from "../utils";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Dialog from "@reach/dialog";
import "@reach/dialog/styles.css";
import Button from "./common/Button";
import { mediumUp } from "../styles/tokens";

const ClearButton = styled.div.attrs({ role: "button", tabIndex: 0 })`
  font-size: 24px;
  margin-left: 8px;

  :hover {
    cursor: pointer;
  }
`;

const StyledDialog = styled(Dialog)`
  width: 80vw;
  ${mediumUp} {
    width: 50vw;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
  }
`;

export default function ClearBoard({ board }) {
  const {
    dispatch,
    state: { answers },
  } = useStore();
  const [showClear, setShowClear] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (answers?.length) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }, [answers?.length]);

  const clearBoard = () => {
    const cleanBoard = clearBoardFromLocalStorage(board.id);

    dispatch({
      type: Actions.HydrateBoard,
      payload: { board: cleanBoard },
    });

    setShowDialog(false);
  };

  const onClickClearBoard = () => {
    setShowDialog(true);
  };

  return (
    <>
      {showClear && (
        <Tooltip label="נקה לוח">
          <ClearButton
            onClick={onClickClearBoard}
            onKeyPress={onClickClearBoard}
          >
            🔄
          </ClearButton>
        </Tooltip>
      )}
      <StyledDialog isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <p>ניקוי הלוח יחזיר אותו למצבו ההתחלתי. סבבה?</p>
        <Button onClick={clearBoard}>סבבה</Button>
      </StyledDialog>
    </>
  );
}
