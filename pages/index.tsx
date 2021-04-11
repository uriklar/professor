import Head from "next/head";
import styles from "../styles/Home.module.css";
import Grid from "../components/Grid";
import { IBoard } from "../types";
import Store from "../components/Store";
import { MOCK_BOARD } from "../mocks";

interface Props {
  board: IBoard;
}

export default function Home({ board }: Props) {
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

// Uncomment this instead of the existing function if you don't want to use firebase
export async function getServerSideProps() {
  return {
    props: {
      board: MOCK_BOARD,
    },
  };
}
