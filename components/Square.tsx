import styled from "styled-components";
import { motion } from "framer-motion";
import { Actions, useStore } from "./Store";
import { AnswerState, IItem } from "../types";
import { getItemState, squareColorByState } from "../utils";

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ state }) => squareColorByState(state)};
  border-radius: 8px;
  ${({ state }) =>
    state !== AnswerState.Answered &&
    state !== AnswerState.Matched &&
    "cursor: pointer;"}
  ${({ state }) =>
    (state === AnswerState.Answered || state === AnswerState.Matched) &&
    "pointer-events: none;"}
  text-align: center;
  /* padding: 24px 48px; */
  font-weight: bold;
  color: white;
`;

interface Props {
  item: IItem;
}

export default function Square({ item }: Props) {
  const {
    dispatch,
    state: { selection, answers },
  } = useStore();

  const itemState = getItemState(item, selection, answers);

  const onSelect = () => {
    dispatch({ type: Actions.SelectItem, payload: { item } });
  };

  return (
    <Container layout state={itemState} onClick={onSelect}>
      {item.text}
    </Container>
  );
}
