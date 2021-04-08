import Head from "next/head";
import styles from "../styles/Home.module.css";
import Grid from "../components/Grid";
import { IBoard } from "../types";
import Store from "../components/Store";
import db from "../db";

interface Props {
  board: IBoard;
}
export default function Home({ board }: Props) {
  console.log(board);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Store board={board}>
          <Grid />
        </Store>
      </main>
    </div>
  );
}

const MOCK_BOARD: IBoard = {
  items: [
    { text: "אחת", categoryId: "1" },
    { text: "שתיים", categoryId: "1" },
    { text: "שלוש", categoryId: "1" },
    { text: "ארבע", categoryId: "1" },
    { text: "אלף", categoryId: "2" },
    { text: "בית", categoryId: "2" },
    { text: "גימל", categoryId: "2" },
    { text: "דלת", categoryId: "2" },
    { text: "כלב", categoryId: "3" },
    { text: "חתול", categoryId: "3" },
    { text: "סוס", categoryId: "3" },
    { text: "נמר", categoryId: "3" },
    { text: "תל אביב", categoryId: "4" },
    { text: "ראשון לציון", categoryId: "4" },
    { text: "אילת", categoryId: "4" },
    { text: "עפולה", categoryId: "4" },
  ],
  answers: {
    "1": ["מספרים", "מספר"],
    "2": ["אותיות", "אות"],
    "3": ["חיות"],
    "4": ["ערים בישראל"],
  },
};

export async function getServerSideProps() {
  const snapshot = await db.collection("boards").doc("testing").get();
  return {
    props: {
      board: snapshot.data(),
    },
  };
}
