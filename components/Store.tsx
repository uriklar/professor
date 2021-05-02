import {
  createContext,
  Dispatch,
  ReactChild,
  ReactChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  IAnswer,
  IBoard,
  ActionMap,
  IItem,
  AnswerState,
  IClues,
} from "../types";
import {
  difference,
  getConnectionCategory,
  getLocalStorage,
  isBrowser,
  LOCAL_STORAGE_KEY,
  shuffle,
  toggleSelection,
} from "../utils";

export enum Actions {
  SelectItem,
  FoundConnection,
  ResetSelection,
  FoundAnswer,
  HydrateBoard,
  LikeBoard,
}

type TPayloads = {
  [Actions.SelectItem]: {
    item: IItem;
  };
  [Actions.FoundConnection]: {
    categoryId: string;
  };
  [Actions.ResetSelection]: Record<string, never>;
  [Actions.FoundAnswer]: {
    categoryId: string;
  };
  [Actions.HydrateBoard]: {
    board: IState;
  };
  [Actions.LikeBoard]: Record<string, never>;
};

export type TActions = ActionMap<TPayloads>[keyof ActionMap<TPayloads>];

export interface IState {
  boardId: string;
  items: IItem[];
  selection: IItem[];
  answers: IAnswer[];
  isLiked: boolean;
  likes: number;
  clues: IClues[];
}

const INITIAL_STATE: IState = {
  boardId: null,
  items: [],
  selection: [],
  answers: [],
  isLiked: null,
  likes: null,
  clues: [],
};

const StoreContext = createContext({
  state: INITIAL_STATE,
  dispatch: null,
  board: null,
  ids: [],
});

function setLocalStorage(boardId: string, answers: IAnswer[]) {
  if (!isBrowser()) {
    return;
  }

  const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...currentData,
      [boardId]: {
        ...(currentData[boardId] || {}),
        answers,
      },
    })
  );
}

function snapShot(boarId: string, boardState: IState) {
  if (!isBrowser()) {
    return;
  }
  console.log("boardState:", boardState);
  debugger;
  const currentData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  const test = {
    ...currentData,
    [boarId]: {
      ...(currentData[boarId] || {}),
      ...boardState,
    },
  };
  console.log(test);
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...currentData,
      [boarId]: {
        ...(currentData[boarId] || {}),
        ...boardState,
      },
    })
  );
}

function reducer(state: IState, action: TActions) {
  let nextAnswers;
  switch (action.type) {
    // Toggles the selected item in/out of selection array
    case Actions.SelectItem:
      return {
        ...state,
        selection: toggleSelection(state.selection, action.payload.item),
      };
    case Actions.ResetSelection:
      return {
        ...state,
        selection: [],
      };
    case Actions.FoundConnection:
      nextAnswers = [
        ...state.answers,
        { categoryId: action.payload.categoryId, state: AnswerState.Matched },
      ];

      // When finding the 3rd category, match the 4th as well
      if (nextAnswers.length === 3) {
        const missingCategoryId = difference(
          ["1", "2", "3", "4"],
          nextAnswers.map((answer) => answer.categoryId)
        )[0];

        nextAnswers = [
          ...nextAnswers,
          { categoryId: missingCategoryId, state: AnswerState.Matched },
        ];
      }

      setLocalStorage(state.boardId, nextAnswers);
      return {
        ...state,
        selection: [],
        answers: nextAnswers,
      };
    case Actions.FoundAnswer:
      // eslint-disable-next-line no-case-declarations
      const { categoryId } = action.payload;
      nextAnswers = state.answers.map((answer) =>
        answer.categoryId === categoryId
          ? { categoryId, state: AnswerState.Answered }
          : answer
      );
      setLocalStorage(state.boardId, nextAnswers);
      return {
        ...state,
        selection: [],
        answers: nextAnswers,
      };
    case Actions.HydrateBoard:
      return {
        ...state,
        ...{
          answers: action.payload.board.answers || [],
          isLiked: action.payload.board.isLiked || false,
          likes: action.payload.board.likes,
        },
      };
    case Actions.LikeBoard:
      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...state,
        likes: state.likes + 1,
        isLiked: true,
      };
      console.log("newState", newState);
      snapShot(state.boardId, newState);
      return newState;
    default:
      return state;
  }
}

interface Props {
  board: IBoard;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  ids: string[];
}

export default function Store({ children, board, ids }: Props) {
  // The 3rd argument get's the 2nd argument as a parameter
  // and initializes the state only once
  console.log(board);
  const [state, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    (initialState) => ({
      ...initialState,
      boardId: board.id,
      likes: board.likes,
      items: shuffle(board.items),
    })
  );
  console.log(state);
  const value = useMemo(() => ({ state, dispatch, board, ids }), [
    board,
    ids,
    state,
  ]);

  // Triggeres when 4 items have been selected,
  // Checks if selection is a category or not
  useEffect(() => {
    if (state.selection.length === 4) {
      const connectionCategory = getConnectionCategory(state.selection);
      if (connectionCategory) {
        dispatch({
          type: Actions.FoundConnection,
          payload: { categoryId: connectionCategory },
        });
      } else {
        setTimeout(
          () => dispatch({ type: Actions.ResetSelection, payload: {} }),
          150
        );
      }
    }
  }, [state.selection, state.selection.length]);

  useEffect(() => {
    if (isBrowser()) {
      const localStorageBoardAnswers = getLocalStorage();

      const boardStorage = localStorageBoardAnswers[board.id];
      if (boardStorage) {
        dispatch({
          type: Actions.HydrateBoard,
          payload: { board: boardStorage },
        });
      }
    }
  }, [isBrowser(), board.id]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): {
  state: IState;
  dispatch: Dispatch<TActions>;
  board: IBoard;
  ids: string[];
} {
  return useContext(StoreContext);
}
