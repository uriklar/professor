import { AnswerState, IAnswer, IItem } from "../types";

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

export function toChunks<T>(arr: any[], n: number): T[][] {
  return [...Array(Math.ceil(arr.length / n))].map((v, i) =>
    arr.slice(i * n, (i + 1) * n)
  );
}

// returns the id of the categroy if the selected items match a category
export function getConnectionCategory(selection: IItem[]) {
  const categories = selection.map((item) => item.categoryId);
  const uniqCategories = [...new Set(categories)];

  return uniqCategories.length === 1 ? uniqCategories[0] : null;
}

// adds or removes a value from the array
// according to weather it exists there or not
export function toggleSelection(arr: IItem[], item: IItem) {
  return arr.includes(item)
    ? arr.filter((i) => i.text !== item.text)
    : [...arr, item];
}

export function getSortedItems(items: IItem[], answers: IAnswer[]) {
  const matchedItems = answers.reduce((acc, answer) => {
    const categoryItems = items.filter(
      (item) => item.categoryId === answer.categoryId
    );

    return [...acc, ...categoryItems];
  }, []);

  const remainingItems = difference(items, matchedItems);

  return {
    matchedItems: toChunks<IItem>(matchedItems, 4),
    remainingItems: toChunks<IItem>(remainingItems, 4),
  };
}

export function getItemState(
  item: IItem,
  selection: IItem[],
  answers: IAnswer[]
) {
  if (selection.includes(item)) {
    // TODO: add another enum?
    return "selected";
  }

  const itemAnswer = answers.find(
    (answer) => answer.categoryId === item.categoryId
  );

  return itemAnswer?.state;
}
