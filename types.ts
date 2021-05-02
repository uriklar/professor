export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface IItem {
  text: string;
  categoryId: string;
}
export interface IClues {
  [categoryId: string]: string;
}

export interface IAnswers {
  [categoryId: string]: string[];
}
export interface IBoard {
  id: string;
  items: IItem[];
  answers: IAnswers;
  likes: number;
  clues?: IClues;
}

export enum AnswerState {
  Matched,
  Answered,
}
export interface IAnswer {
  categoryId: string;
  state: AnswerState;
}

export interface ILikes {
  [boardId: string]: { likes: number };
}
