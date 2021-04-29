import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Actions, useStore } from "./Store";
import { compareTwoStrings } from "string-similarity";
import { stripCharsForStringCompare } from "../utils";

interface Props {
  categoryId: string;
}

const Container = styled(motion.div)`
  grid-column: span 4;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 50%;
    padding: 4px;
    font-size: 18px;
  }

  button {
    padding: 4px 16px;
    background: #2e3161;
    color: white;
    margin-right: 16px;
    font-size: 18px;

    &:focus-within {
      background: #6971e0;
      transition: 200ms ease;
    }
  }
`;

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
  const shouldShowClues = (board.clues[categoryId] !== undefined || board.clues[categoryId] !== "");

    return (
      <Container>
        <input
          placeholder="מה הקשר?"
          value={value}
          onKeyPress={onKeyPress}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={onSubmit}>בום</button>
        {shouldShowClues && <button onClick={() => { alert(board.clues[categoryId]);}}> 💡 רמז </button>}
      </Container>
    );
  }
