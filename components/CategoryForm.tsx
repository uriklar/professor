import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
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
      <div style={{ marginBottom: 20 }}> הזן את מילות הקטגוריה:</div>
      <div>
        {items.map((item, index) => (
          <TextField
            key={index}
            label="מילה"
            value={itemValues[index]}
            onChange={(e) => onItemTextChange(e.target.value, index)}
            onBlur={(e) =>
              onItemBlur(e.target.value, categoryIndex * 4 + index)
            }
            variant="outlined"
          />
        ))}
      </div>

      {allItemsFilled && (
        <div>
          <div>נא להזין ערכים מופרדים ע"י פסיקים</div>
          <TextField
            label="תשובות"
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
          />
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
