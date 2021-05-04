import React, { useState } from "react";
import { IBoard, IItem } from "../types";
import {
  EMPTY_BOARD,
  generateBoardUrl,
  getNextFreeId,
  toChunks,
  validateIsEnglish,
} from "../utils";
import CategoryForm from "./CategoryForm";
import Button from "./common/Button";

function useCreateBoard(ids: string[]) {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [username, setUsername] = useState("");

  const id = getNextFreeId(username, ids);

  const onItemBlur = (value: string, index: number) => {
    const nextItems = board.items.map((item, i) => {
      const nextValue = i === index ? value : item.text;
      return { ...item, text: nextValue };
    });

    setBoard({
      ...board,
      items: nextItems,
    });
  };
  const onClueBlur = (categoryId: string, value: string) => {
    setBoard({
      ...board,
      clues: {
        ...board.clues,
        [categoryId]: value,
      },
    });
  };
  const onAnswersBlur = (value: string[], categoryId: string) => {
    setBoard({
      ...board,
      answers: {
        ...board.answers,
        [categoryId]: value,
      },
    });
  };

  const boardUrl = generateBoardUrl(username, id);
  const categories = toChunks<IItem>(board.items, 4);

  return {
    id,
    board,
    username,
    boardUrl,
    categories,
    setUsername,
    onItemBlur,
    onAnswersBlur,
    onClueBlur,
  };
}

interface Props {
  ids: string[];
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    board: IBoard,
    boardUrl: string
  ) => void;
}

export default function CreateBoard({ onSubmit, ids }: Props) {
  const {
    id,
    board,
    username,
    setUsername,
    onAnswersBlur,
    onItemBlur,
    onClueBlur,
    boardUrl,
    categories,
  } = useCreateBoard(ids);

  return (
    <div>
      <main style={{ padding: 40 }}>
        <h1>יצירת לוח</h1>

        <form
          onSubmit={(e) => onSubmit(e, username, { id, ...board }, boardUrl)}
        >
          {/* <h2>כמה פרטים עליך</h2> */}

          {/* <fieldset>
                <label>
                  שם
                  <input placeholder="שם (פרטי, מלא, בדוי..)" />
                </label>
              </fieldset> */}

          <fieldset>
            <label>
              שם משתמש (אנגלית בלבד)
              <input
                placeholder="שם משתמש (אנגלית בלבד)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={validateIsEnglish}
                required
              />
            </label>
          </fieldset>

          {username && (
            <div className="board-url-notice">
              בסיום היצירה הלוח שלך יהיה זמין בכתובת:
              <a href={boardUrl}>{boardUrl}</a>
            </div>
          )}

          {categories.map((categoryItems, index) => (
            <CategoryForm
              key={index}
              index={index}
              items={categoryItems}
              categoryIndex={index}
              onItemBlur={onItemBlur}
              onAnswersBlur={onAnswersBlur}
              onClueBlur={onClueBlur}
            />
          ))}

          <Button type="submit">סיימתי</Button>
        </form>
      </main>
    </div>
  );
}
