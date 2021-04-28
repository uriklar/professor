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
export interface IClue {
  [index:number]: {categoryId: string,text: string;};
}

export interface IAnswers {
  [categoryId: string]: string[];
}
export interface IBoard {
  id: string;
  items: IItem[];
  answers: IAnswers;
  clues: IClue[];
}

export enum AnswerState {
  Matched,
  Answered,
}
export interface IAnswer {
  categoryId: string;
  state: AnswerState;
}
