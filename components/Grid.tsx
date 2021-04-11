import { AnimateSharedLayout, motion } from "framer-motion";
import styled from "styled-components";
import { getSortedItems } from "../utils";
import Row from "./Row";
import { useStore } from "./Store";

const Container = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  padding: 8px;
  min-width: 600px;
  min-height: 600px;
  border-style: solid;
  border-width: 8px;
  border-image: linear-gradient(90deg, #6971e0 12%, #5157ad 98%);
  border-image-slice: 9;
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
