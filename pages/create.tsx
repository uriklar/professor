import React from "react";
import slugify from "slugify";
import BoardForm from "../components/BoardForm";
import { IBoard } from "../types";
import { makeid } from "../utils";

const ID = makeid(4);

const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  board: IBoard,
  boardUrl: string
) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({
        board: { ...board, id: slugify(`${username} ${ID}`) }
      }),
    });
    const responseJson = await response.json();

    if (typeof window !== "undefined") {
      window.location.href = `${boardUrl}?toast=new`;
    }
  } catch {}
};

export default function Create() {
  return <BoardForm id={ID} onSubmit={onSubmit} />;
}
