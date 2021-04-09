import { useState } from "react";
import styled from "styled-components";
import { Actions, useStore } from "./Store";
interface Props {
  categoryId: string;
}

const Container = styled.div``;

export default function AnswerInput({ categoryId }: Props) {
  const [value, setValue] = useState("");
  const { board, dispatch } = useStore();

  const onSubmit = () => {
    const categoryAnswers = board.answers[categoryId];
    if (categoryAnswers.includes(value)) {
      dispatch({ type: Actions.FoundAnswer, payload: { categoryId } });
    } else {
      setValue("");
    }
  };

  return (
    <Container>
      <input
        placeholder="מה הקשר?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onSubmit}>שלח</button>
    </Container>
  );
}
