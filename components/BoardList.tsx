import React, { useRef, useState } from "react";
import { IBoard } from "../types";
import BoardListItem from "./BoardListItem";
import styled from "styled-components";
import { getLocalStorage, sortBySolvedState } from "../utils";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import BoardListFilters from "./BoardListFilters";

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

function test(string, substring) {
  const format = (arr) =>
    [...arr].map((l) => l.toLowerCase()).filter((l) => l !== " " && l !== "-");

  const lString = format(string);
  const lSub = format(substring);

  return lSub.every((x) => {
    const index = lString.indexOf(x);
    if (~index) {
      lString.splice(index, 1);
      return true;
    }
  });
}

function getSortedAndFilteredIds(
  ids: string[],
  localStorage: any,
  query: string,
  sortDir: "asc" | "desc"
) {
  return ids.filter((id) => test(id, query));
  // .sort((a, b) =>
  //   sortBySolvedState(
  //     localStorage[a]?.answers,
  //     localStorage[b]?.answers,
  //     sortDir
  //   )
  // );
}

export default function BoardList({ ids, board, open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const localStorage = getLocalStorage();
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  return (
    <Container open={open} ref={ref}>
      <BoardListFilters
        open={open}
        query={query}
        setQuery={setQuery}
        sortDir={sortDir}
        setSortDir={setSortDir}
      />

      <ul>
        {getSortedAndFilteredIds(ids, localStorage, query, sortDir).map(
          (id) => (
            <BoardListItem
              open={open}
              key={id}
              id={id}
              currentId={board.id}
              answers={localStorage[id]?.answers}
            />
          )
        )}
      </ul>
    </Container>
  );
}
