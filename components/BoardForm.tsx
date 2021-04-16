import { useState } from "react";
import slugify from "slugify";
import { IBoard, IItem } from "../types";
import {
  EMPTY_BOARD,
  generateBoardUrl,
  toChunks,
  validateIsEnglish,
} from "../utils";
import CategoryForm from "./CategoryForm";

function useCreateBoard(id: string) {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [username, setUsername] = useState("");

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
    board,
    username,
    boardUrl,
    categories,
    setUsername,
    onItemBlur,
    onAnswersBlur,
  };
}

interface Props {
  id: string;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    board: IBoard,
    boardUrl: string
  ) => void;
}

export default function CreateBoard({ id, onSubmit }: Props) {
  const {
    board,
    username,
    setUsername,
    onAnswersBlur,
    onItemBlur,
    boardUrl,
    categories,
  } = useCreateBoard(id);

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
                className="input"
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
            />
          ))}

          <button type="submit" className='button'>סיימתי</button>
        </form>
      </main>
    </div>
  );
}
