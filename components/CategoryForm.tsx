import React, { useState } from "react";
import { IItem } from "../types";

interface Props {
  items: IItem[];
  categoryIndex: number;
  onItemBlur: (value: string, index: number) => void;
  onAnswersBlur: (value: string[], categoryIndex: string) => void;
}

const CategoryForm = ({
  items,
  categoryIndex,
  onItemBlur,
  onAnswersBlur,
  index,
}: Props) => {
  const [itemValues, setItemValues] = useState({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });
  const [answers, setAnswers] = useState("");

  const onItemTextChange = (value, index) =>
    setItemValues({
      ...itemValues,
      [index]: value,
    });

  const allItemsFilled = Object.values(itemValues).filter(Boolean).length === 4;

  return (
    <div>
      <div style={{ marginBottom: 20, marginTop: 20 }}>
        {" "}
        קטגוריה {index + 1}:
      </div>
      <div className="category-form-input-group">
        {items.map((item, index) => (
          <input
            key={index}
            placeholder="מילה"
            value={itemValues[index]}
            onChange={(e) => onItemTextChange(e.target.value, index)}
            onBlur={(e) =>
              onItemBlur(e.target.value, categoryIndex * 4 + index)
            }
            required
          />
        ))}
      </div>

      {allItemsFilled && (
        <div
          css={`
            margin-top: 20px;
          `}
        >
          <div
            css={`
              margin-bottom: 10px;
              font-size: 14px;
            `}
          >
            נא להזין ערכים מופרדים ע"י פסיקים
          </div>
          <input
            css={`
              padding: 6px 24px;
              width: 80%;
            `}
            placeholder="תשובות"
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            onBlur={() =>
              onAnswersBlur(
                answers
                  .split(",")
                  .map((a) => a.trim())
                  .filter(Boolean),
                items[0].categoryId
              )
            }
            required
          />
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
