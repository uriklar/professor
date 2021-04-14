import React from "react";
import BoardForm from "../../components/BoardForm";
import db from "../../db";
import { IBoard } from "../../types";

interface Props {
  board: IBoard;
}

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
        board: { ...board },
      }),
    });
    const responseJson = await response.json();

    if (typeof window !== "undefined") {
      window.location.href = `${boardUrl}`;
    }
  } catch {}
};

export default function Edit({ board }: Props) {
  return <BoardForm id={board.id} initialBoard={board} onSubmit={onSubmit} />;
}

export async function getServerSideProps({ params }) {
  const snapshot = await db.collection("boards").doc(params.id).get();

  return {
    props: {
      board: snapshot.data(),
    },
  };
}
