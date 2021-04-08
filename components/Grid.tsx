import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { TBoard } from "../pages/types";
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

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function difference(arr1, arr2) {
  return arr1.filter((value) => !arr2.includes(value));
}

function generateInitialItems(board: TBoard) {
  const shuffledItems = shuffle(board.map((category) => category.words).flat());
  return [...shuffledItems];
}

function getSelectedItems(selection) {
  return Object.keys(selection).filter((key) => !!selection[key]);
}

function getFoundCategory(selectedItems: string[], board: TBoard) {
  return board.find(
    (category) => difference(category.words, selectedItems).length === 0
  )?.id;
}

function getSortedItems(
  items: string[],
  foundCategories: string[],
  board: TBoard
) {
  const correctItems = foundCategories.reduce((acc, categoryId) => {
    const category = board.find((_category) => _category.id === categoryId);
    return [...acc, ...category.words];
  }, []);

  const otherItems = difference(items, correctItems);

  return { correctItems, otherItems };
}

function useBoard(board: TBoard) {
  const [items, setItems] = useState(generateInitialItems(board));
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
      const foundCategoryId = getFoundCategory(selectedItems, board);

      if (foundCategoryId) {
        setFoundCategories([...foundCategories, foundCategoryId]);
      }

      setSelection({});
    }
  }, [selection]);

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
          state={!!selection[item] ? "selected" : null}
        />
      ))}
    </Container>
  );
}
