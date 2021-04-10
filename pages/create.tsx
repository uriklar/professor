import styled from "styled-components";
import { Button, FormGroup, TextField } from "@material-ui/core";
import Head from "next/head";
import React, { useRef, useState } from "react";
import slugify from "slugify";
import CategoryForm from "../components/CategoryForm";
import { IItem } from "../types";
import { toChunks } from "../utils/board.utils";
import ContentSort from "material-ui/svg-icons/content/sort";

function makeid(length) {
  var result = [];
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

const EMPTY_BOARD = {
  items: [
    { text: "", categoryId: "1" },
    { text: "", categoryId: "1" },
    { text: "", categoryId: "1" },
    { text: "", categoryId: "1" },
    { text: "", categoryId: "2" },
    { text: "", categoryId: "2" },
    { text: "", categoryId: "2" },
    { text: "", categoryId: "2" },
    { text: "", categoryId: "3" },
    { text: "", categoryId: "3" },
    { text: "", categoryId: "3" },
    { text: "", categoryId: "3" },
    { text: "", categoryId: "4" },
    { text: "", categoryId: "4" },
    { text: "", categoryId: "4" },
    { text: "", categoryId: "4" },
  ],
  answers: {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
  },
};

const ID = makeid(4);

export default function Create() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [username, setUsername] = useState("");
  const ref = useRef<HTMLFormElement>();

  let boardUrl;

  if (typeof window !== "undefined") {
    boardUrl = `${window.location.origin}/${slugify(username)}/${ID}`;
  }

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

  const validateIsEnglish = (e) => {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) return true;
    e.preventDefault();
    return false;
  };

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          board: { id: slugify(`${username} ${ID}`), ...board },
        }),
      });
      const responseJson = await response.json();

      if (typeof window !== "undefined") {
        window.location.href = `${boardUrl}?toast=new`;
      }
    } catch {}
  };

  const categories = toChunks<IItem>(board.items, 4);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: 40 }}>
        <h1>יצירת לוח</h1>

        <form ref={ref}>
          <h2>כמה פרטים עליך</h2>

          <FieldGroup>
            <TextField label="שם (פרטי, מלא, בדוי..)" variant="outlined" />
          </FieldGroup>

          <FieldGroup>
            <TextField
              label="שם משתמש (אנגלית בלבד)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              onKeyPress={validateIsEnglish}
            />
          </FieldGroup>

          {username && (
            <div
              style={{
                padding: "40px 80px",
                backgroundColor: "hsl(123, 37%, 75%)",
              }}
            >
              בסיום היצירה הלוח שלך יהיה זמין בכתובת:
              <a href={boardUrl}>{boardUrl}</a>
            </div>
          )}

          {categories.map((categoryItems, index) => (
            <CategoryForm
              key={index}
              items={categoryItems}
              categoryIndex={index}
              onItemBlur={onItemBlur}
              onAnswersBlur={onAnswersBlur}
            />
          ))}

          <Button onClick={onSubmit} variant="contained" color="primary">
            סיימתי
          </Button>
        </form>
      </main>
    </div>
  );
}

const FieldGroup = styled(FormGroup)`
  margin-bottom: 20px;
`;
