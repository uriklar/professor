import { TBoard } from "../types";

// Shuffles an array
export function shuffle(array) {
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

// Returns an array with the difference between two arrays
export function difference(arr1, arr2) {
  return arr1.filter((value) => !arr2.includes(value));
}

// Generates a flat array of items, shuffled
export function generateInitialItems(board: TBoard) {
  const shuffledItems = shuffle(board.map((category) => category.words).flat());
  return [...shuffledItems];
}

// returns an array of currently selected items
export function getSelectedItems(selection) {
  return Object.keys(selection).filter((key) => !!selection[key]);
}

// returns the id of the categroy if the selected items match a category
export function getFoundCategoryId(selectedItems: string[], board: TBoard) {
  return board.find(
    (category) => difference(category.words, selectedItems).length === 0
  )?.id;
}

// Returns two arrays of items:
// correctItems - items that were already matched correctly
// otherItems - the remaining items to be found
export function getSortedItems(
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
