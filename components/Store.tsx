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
import { IAnswer, IBoard, ActionMap, IItem, AnswerState } from "../types";
import {
  getConnectionCategory,
  shuffle,
  toggleSelection,
} from "../utils/board.utils";

export enum Actions {
  SelectItem,
  FoundConnection,
  ResetSelection,
}

type TPayloads = {
  [Actions.SelectItem]: {
    item: IItem;
  };
  [Actions.FoundConnection]: {
    categoryId: string;
  };
  [Actions.ResetSelection]: {};
};

export type TActions = ActionMap<TPayloads>[keyof ActionMap<TPayloads>];

export interface IState {
  items: IItem[];
  selection: IItem[];
  answers: IAnswer[];
}

const INITIAL_STATE: IState = {
  items: [],
  selection: [],
  answers: [],
};

const StoreContext = createContext({
  state: INITIAL_STATE,
  dispatch: null,
});

function reducer(state: IState, action: TActions) {
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
      return {
        ...state,
        selection: [],
        answers: [
          ...state.answers,
          { categoryId: action.payload.categoryId, state: AnswerState.Matched },
        ],
      };
    default:
      return state;
  }
}

interface Props {
  board: IBoard;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export default function Store({ children, board }: Props) {
  // The 3rd argument get's the 2nd argument as a parameter
  // and initializes the state only once
  const [state, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    (initialState) => ({ ...initialState, items: shuffle(board.items) })
  );

  const value = useMemo(() => ({ state, dispatch }), [state]);

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
        dispatch({ type: Actions.ResetSelection, payload: {} });
      }
    }
  }, [state.selection?.length]);

  console.log(value);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): {
  state: IState;
  dispatch: Dispatch<TActions>;
} {
  return useContext(StoreContext);
}
