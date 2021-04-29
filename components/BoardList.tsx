import React, { useRef } from "react";
import { IBoard } from "../types";
import BoardListItem from "./BoardListItem";
import styled from "styled-components";
import { getLocalStorage } from "../utils";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

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
  onClose: () => void;
}
export default function BoardList({ ids, board, open, onClose }: Props) {
  const localStorage = getLocalStorage();
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  return (
    <Container open={open} ref={ref}>
      <ul>
        {ids.map((id) => (
          <BoardListItem
            open={open}
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
