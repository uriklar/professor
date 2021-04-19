import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { mediumUp } from "../styles/tokens";
import { getSortedItems } from "../utils";
import Row from "./Row";
import { useStore } from "./Store";

const BorderContainer = styled.div`
  border-style: solid;
  border-width: 8px;
  border-image: linear-gradient(90deg, #6971e0 12%, #5157ad 98%);
  border-image-slice: 9;
  padding: 8px;
  padding-top: 100%;
  position: relative;
  width: 100%;
  display: grid; // required because of f*ucking safari mobile

  ${mediumUp} {
    width: 600px;
    height: 600px;
    padding-top: 0;
  }
`;

const Container = styled(motion.div)`
  display: grid; // The container has to be display: grid because of Safari mobile something...
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
  bottom: 8px;
  right: 8px;
  height: calc(100% - 16px); // another safari mobile hack
`;

export default function Grid() {
  const {
    state: { items, answers },
  } = useStore();

  const { matchedItems, remainingItems } = getSortedItems(items, answers);
  //const fullySolved = isFullySolved(answers);

  return (
    <>
      {/* Removed this for now, but we'll defenitly want to pop something up once
      the board is fully solved  */}
      {/*<SuccessGif />*/}
      <AnimateSharedLayout>
        <BorderContainer>
          <Container layout>
            {matchedItems.map((itemRow) => (
              <Row items={itemRow} key={itemRow[0].text} />
            ))}
            {remainingItems.map((itemRow) => (
              <Row items={itemRow} key={itemRow[0].text} />
            ))}
          </Container>
        </BorderContainer>
      </AnimateSharedLayout>
    </>
  );
}
