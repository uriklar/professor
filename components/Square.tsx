import styled from "styled-components";
import { motion } from "framer-motion";
import { Actions, useStore } from "./Store";
import { AnswerState, IItem } from "../types";
import { getItemState } from "../utils/board.utils";

function getBgColor(state: AnswerState | "selected") {
  switch (state) {
    case "selected":
      return "blue";
    case AnswerState.Matched:
      return "purple";
    case AnswerState.Answered:
      return "yellow";
    default:
      return "green";
  }
}

const Container = styled(motion.div)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ state }) => getBgColor(state)};
  border-radius: 8px;
  ${({ state }) =>
    state !== AnswerState.Answered &&
    state !== AnswerState.Matched &&
    "cursor: pointer;"}
  ${({ state }) =>
    (state === AnswerState.Answered || state === AnswerState.Matched) &&
    "pointer-events: none;"}
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
