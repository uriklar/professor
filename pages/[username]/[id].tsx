import Head from "next/head";
import Grid from "../../components/Grid";
import Store from "../../components/Store";
import db from "../../db";
import { MOCK_BOARD } from "../../mocks";
import { IBoard } from "../../types";
import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Link from "next/link";

interface Props {
  board: IBoard;
}

export default function Board({ board, ids }: Props) {
  const [showToast, setShowToast] = useState(false);
  const closeToast = () => setShowToast(false);
  const router = useRouter();

  useEffect(() => {
    const { toast } = router.query;
    if (toast === "new") {
      setShowToast(true);
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.main}>
        <h2>לוחות קיימים:</h2>
        <ul>
          {ids.map((id) => {
            const splitId = id.split("-");
            const boardId = splitId[splitId.length - 1];
            splitId.splice(-1, 1);
            const href = `/${splitId.join("-")}/${boardId}`;
            return (
              <li key={id}>
                <a href={href}>{id}</a>
              </li>
            );
          })}
        </ul>
      </header>

      <main className={styles.main}>
        <Store board={board}>
          <Grid />
        </Store>

        {/* Toast in case of new board */}
        <Snackbar
          open={showToast}
          autoHideDuration={3000}
          onClose={closeToast}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={closeToast} severity="success">
            הלוח נוצר בהצלחה!
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // I tried creating a node script to seed the data, but had issues
  // If you feel like giving this a shot for a better solution then what I did here, feel free
  // Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP
  // const docRef = db.collection("boards").doc("testing");
  // await docRef.set(MOCK_BOARD);
  // Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP

  const snapshot = await db
    .collection("boards")
    .doc(`${params.username}-${params.id}`)
    .get();
  const querySnapshot = await db.collection("boards").select().get();
  const ids = querySnapshot.docs.map((doc) => doc.id);

  return {
    props: {
      board: snapshot.data(),
      ids,
    },
  };
}

// Uncomment this instead of the existing function if you don't want to use firebase
// export async function getServerSideProps() {
//   return {
//     props: {
//       board: MOCK_BOARD,
//     },
//   };
// }
