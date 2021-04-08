import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { TBoard } from "../types";
import {
  generateInitialItems,
  getSelectedItems,
  getSortedItems,
  getFoundCategoryId,
} from "../utils/board.utils";
import Square from "./Square";

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 600px;
  background: gray;
  padding: 16px;
  border-radius: 8px;
`;

function useBoard(board: TBoard) {
  const [items] = useState(generateInitialItems(board));
  const [foundCategories, setFoundCategories] = useState([]);
  const [selection, setSelection] = useState({});

  const onSelect = useCallback(
    (item) => {
      setSelection({
        ...selection,
        [item]: !selection[item],
      });
    },
    [selection]
  );

  useEffect(() => {
    const selectedItems = getSelectedItems(selection);
    if (selectedItems.length === 4) {
      const foundCategoryId = getFoundCategoryId(selectedItems, board);

      if (foundCategoryId) {
        setFoundCategories([...foundCategories, foundCategoryId]);
      }

      setSelection({});
    }
  }, [board, foundCategories, selection]);

  return {
    items,
    selection,
    onSelect,
    foundCategories,
  };
}

interface Props {
  board: TBoard;
}

export default function Grid({ board }: Props) {
  const { items, selection, onSelect, foundCategories } = useBoard(board);

  const { correctItems, otherItems } = getSortedItems(
    items,
    foundCategories,
    board
  );

  return (
    <Container layout>
      {correctItems.map((item) => (
        <Square item={item} key={item} state="correct" />
      ))}
      {otherItems.map((item) => (
        <Square
          item={item}
          key={item}
          onSelect={onSelect}
          state={selection[item] ? "selected" : null}
        />
      ))}
    </Container>
  );
}
