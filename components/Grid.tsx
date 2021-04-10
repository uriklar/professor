import { AnimateSharedLayout, motion } from "framer-motion";
import styled from "styled-components";
import { getSortedItems } from "../utils/board.utils";
import Row from "./Row";
import { useStore } from "./Store";

const Container = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  background: gray;
  padding: 16px;
  border-radius: 8px;
`;

export default function Grid() {
  const {
    state: { items, answers },
  } = useStore();

  const { matchedItems, remainingItems } = getSortedItems(items, answers);

  return (
    <AnimateSharedLayout>
      <Container layout>
        {matchedItems.map((itemRow) => (
          <Row items={itemRow} key={itemRow[0].text} />
        ))}
        {remainingItems.map((itemRow) => (
          <Row items={itemRow} key={itemRow[0].text} />
        ))}
      </Container>
    </AnimateSharedLayout>
  );
}
