import styled from "styled-components";
import { motion } from "framer-motion";
import { Actions, useStore } from "./Store";
import { AnswerState, IItem } from "../types";
import { getItemState } from "../utils";
import { Props } from "react";

function getBgColor(state: AnswerState | "selected") {
  switch (state) {
    case "selected":
      return "#E0C353";
    case AnswerState.Matched:
      return "#5158AD";
    case AnswerState.Answered:
      return "#4B4C61";
    default:
      return "#64B5ED";
  }
}

//   case "selected":
// return "#6971E0";
// case AnswerState.Matched:
//   return "#64B5ED";
// case AnswerState.Answered:
//   return "#5158AD";
// default:
//   return "#50515d";

const Container = styled(motion.div)`
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
