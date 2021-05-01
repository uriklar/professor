import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mediumUp } from "../styles/tokens";
import { getSortedItems, isFullySolved } from "../utils";
import Row from "./Row";
import { useStore } from "./Store";
import LikeOverlay from "./LikeOverlay";

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
    state: { items, answers, boardId, isLiked },
  } = useStore();
  const fullySolved = isFullySolved(answers);

  const [showLikeOverlay, setShowLikeOverlay] = useState(false);

  useEffect(() => {
    if (fullySolved && !isLiked) {
      setShowLikeOverlay(true);
    }
  }, [fullySolved, isLiked]);

  const { matchedItems, remainingItems } = getSortedItems(items, answers);
  return (
    <>
      <AnimateSharedLayout>
        <BorderContainer>
          <LikeOverlay
            show={showLikeOverlay}
            setShow={setShowLikeOverlay}
            boardId={boardId}
            isLiked={isLiked}
          />
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
