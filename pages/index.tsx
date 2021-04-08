import Head from "next/head";
import styles from "../styles/Home.module.css";
import Grid from "../components/Grid";
import { TBoard } from "../types";

interface Props {
  board: TBoard;
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
        <Grid board={board} />
      </main>
    </div>
  );
}

const MOCK_BOARD: TBoard = [
  {
    id: "0",
    words: ["אחד", "שתיים", "שלוש", "ארבע"],
    answers: ["מספרים", "מספר"],
  },
  {
    id: "1",
    words: ["אלף", "בית", "גימל", "דלת"],
    answers: ["אותיות", "אות"],
  },
  {
    id: "2",
    words: ["כלב", "חתול", "נמר", "ארנב"],
    answers: ["חיות"],
  },
  {
    id: "3",
    words: ["עורך דין", "מכונאי רכב", "שופט", "מתכנת"],
    answers: ["מקצועות"],
  },
];

export async function getServerSideProps() {
  return {
    props: {
      board: MOCK_BOARD,
    },
  };
}
