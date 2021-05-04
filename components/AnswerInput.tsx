import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Actions, useStore } from "./Store";
import { compareTwoStrings } from "string-similarity";
import { isFullySolved, stripCharsForStringCompare } from "../utils";
import { AnswerState, IBoard } from "../types";
import Button from "./common/Button";

interface Props {
  categoryId: string;
}

const TWO_MINUTES = 120000;

const Container = styled(motion.div)`
  grid-column: span 4;
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 50%;
    padding: 4px;
    font-size: 18px;
  }
`;

function useShouldShowClues(board: IBoard, categoryId: string) {
  const {
    state: { answers },
  } = useStore();

  const [showClues, setShowClues] = useState(false);

  const fullySolved = isFullySolved(answers, AnswerState.Matched);

  useEffect(() => {
    if (fullySolved && !!board.clues?.[categoryId]) {
      setTimeout(() => setShowClues(true), TWO_MINUTES);
    }
  }, [board.clues, categoryId, fullySolved]);

  return showClues;
}

export default function AnswerInput({ categoryId }: Props) {
  const [value, setValue] = useState("");
  const { board, dispatch } = useStore();

  const onSubmit = () => {
    const categoryAnswers = board.answers[categoryId];
    if (
      categoryAnswers.some(
        (answer) =>
          compareTwoStrings(
            stripCharsForStringCompare(value),
            stripCharsForStringCompare(answer)
          ) > 0.85
      )
    ) {
      dispatch({ type: Actions.FoundAnswer, payload: { categoryId } });
    } else {
      setValue("");
    }
  };

  const onKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault(); // Ensure it is only this code that runs

      onSubmit();
    }
  };

  const shouldShowClues = useShouldShowClues(board, categoryId);

  return (
    <Container>
      <input
        placeholder="מה הקשר?"
        value={value}
        onKeyPress={onKeyPress}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={onSubmit}>בום</Button>
      {shouldShowClues && (
        <ClueButton
          onClick={() => {
            alert(board.clues[categoryId]);
          }}
        >
          <span
            css={`
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;
              font-size: 16px;
            `}
          >
            💡
          </span>{" "}
          רמז
        </ClueButton>
      )}
    </Container>
  );
}

const ClueButton = styled(Button)`
  position: relative;
`;
