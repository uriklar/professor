import { getBoardUrlFromId, squareColorByState } from "../utils";
import styled from "styled-components";
import { AnswerState, IAnswer } from "../types";
import React, { useMemo } from "react";

const Container = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.a.attrs((props) => ({
  tabIndex: props.open ? 0 : -1,
}))<{ selected: boolean; open: boolean }>`
  margin-bottom: 8px;
  ${({ selected }) => selected && `color: #E0C353; font-weight: bold;`}
`;

const SquaresContainer = styled.div`
  display: grid;
  grid-template-columns: 8px 8px 8px 8px;
  grid-template-rows: 12px;
  gap: 4px;
  padding-right: 8px;
`;

const Square = styled.div<{ state: AnswerState }>`
  border-radius: 2px;
  background-color: ${({ state }) => squareColorByState(state)};
`;

interface Props {
  id: string;
  currentId: string;
  answers: IAnswer[];
  open: boolean;
}

export default function BoardListItem({ id, currentId, answers, open }: Props) {
  const selected = currentId === id;

  const filledAnswers = useMemo(
    () => (answers ? [...Array(4 - answers.length), ...answers] : null),
    [answers]
  );

  return (
    <Container key={id}>
      <Title selected={selected} href={getBoardUrlFromId(id)} open={open}>
        {id.replace("-", " ")}
      </Title>
      {answers && (
        <SquaresContainer>
          {filledAnswers.map((answer, i) => (
            <Square key={i} state={answer?.state} />
          ))}
        </SquaresContainer>
      )}
    </Container>
  );
}
