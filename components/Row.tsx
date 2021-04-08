import styled from "styled-components";
import { motion } from "framer-motion";
import { AnswerState, IItem } from "../types";
import Square from "./Square";
import { useStore } from "./Store";
import { getConnectionCategory } from "../utils/board.utils";

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

interface Props {
  items: IItem[];
}
export default function Row({ items }: Props) {
  const {
    state: { answers },
  } = useStore();

  const connectionCategory = getConnectionCategory(items);
  const answer =
    connectionCategory &&
    answers.find((answer) => answer.categoryId === items[0].categoryId);
  const isMatchedButNotAnswered =
    answer && answer.state === AnswerState.Matched;

  return (
    <Container layout>
      {items.map((item) => (
        <Square item={item} key={item.text} />
      ))}
      {isMatchedButNotAnswered && <input placeholder="מה הקשר?" />}
    </Container>
  );
}
