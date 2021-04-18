// import Head from "next/head";
// import Link from "next/link";
// import Grid from "../components/Grid";
// import Store from "../components/Store";
// import { IBoard } from "../types";
// import { useEffect, useState } from "react";
import { getBoardUrlFromId } from "../../utils";

interface Props {
  // board: IBoard;
  show: boolean;
  ids: string[];
  toggleBoard: any;
}

export default function Board({ show, ids, toggleBoard }: Props) {
  return (
    <aside className={`selectBoards ${show && "open"}`}>
      <button className="tab" onClick={toggleBoard}>
        <h3>בחירת לוח</h3>
      </button>
      <ul className="boardList">
        {ids.map((id) => (
          <li key={id}>
            <a href={getBoardUrlFromId(id)}>{id}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
