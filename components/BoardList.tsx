import React from "react";
import { IBoard } from "../types";
import BoardListItem from "./BoardListItem";
import styled from "styled-components";
import { getLocalStorage } from "../utils";
//@apply p-4 fixed top-0 bottom-0 w-1/6 bg-white border-l shadow
// transition transition-all duration-200 right-0 transform translate-x-full;
const Container = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  padding: 16px;
  background-color: white;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: transform 200ms ease-in;
  transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(100%)")};
`;

interface Props {
  ids: string[];
  board: IBoard;
  open: boolean;
}
export default function BoardList({ ids, board, open }: Props) {
  const localStorage = getLocalStorage();
  return (
    <Container open={open}>
      <ul>
        {ids.map((id) => (
          <BoardListItem
            key={id}
            id={id}
            currentId={board.id}
            answers={localStorage[id]?.answers}
          />
        ))}
      </ul>
    </Container>
  );
}
