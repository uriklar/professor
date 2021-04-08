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

export interface IAnswers {
  [categoryId: string]: string[];
}
export interface Category {
  words: string[];
  answers: string[];
  id: string;
}
export interface IBoard {
  items: IItem[];
  answers: IAnswers;
}

export enum AnswerState {
  Matched,
  Answered,
}
export interface IAnswer {
  categoryId: string;
  state: AnswerState;
}
