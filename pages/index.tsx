import Head from "next/head";
import styles from "../styles/Home.module.css";
import Grid from "../components/Grid";
import { IBoard } from "../types";
import Store from "../components/Store";
import db from "../db";
import { MOCK_BOARD } from "../mocks";

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

export async function getServerSideProps() {
  // I tried created a node script to seed the data, but had issues
  // If you feel like giving this a shot for a better solution then what I did here, feel free
  // Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP
  const docRef = db.collection("boards").doc("testing");
  await docRef.set(MOCK_BOARD);
  // Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP

  const snapshot = await db.collection("boards").doc("testing").get();
  return {
    props: {
      board: snapshot.data(),
    },
  };
}
