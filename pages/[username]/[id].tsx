import Head from "next/head";
import Grid from "../../components/Grid";
import Store from "../../components/Store";
import db from "../../db";
import { IBoard } from "../../types";
import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBoardUrlFromId } from "../../utils";
import { MOCK_BOARD } from "../../mocks";

interface Props {
  board: IBoard;
  ids: string[];
}

function useToast() {
  const [showToast, setShowToast] = useState(false);
  const closeToast = () => setShowToast(false);
  const router = useRouter();

  useEffect(() => {
    const { toast } = router.query;
    if (toast === "new") {
      setShowToast(true);
    }
  }, []);

  return {
    showToast,
    closeToast,
  };
}

export default function Board({ board, ids }: Props) {
  const { showToast, closeToast } = useToast();

  return (
    <>
      <Head>
        <title>פרופסור קהילתי</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>פרופסור</header>
      <main>
        {/* Existing boards */}
        <aside>
          <h3>לוחות קיימים:</h3>
          <ul>
            {ids.map((id) => (
              <li key={id}>
                <a href={getBoardUrlFromId(id)}>{id}</a>
              </li>
            ))}
          </ul>
        </aside>

        <Store board={board}>
          <div className="grid-container">
            <Grid />
          </div>
        </Store>
      </main>
      {/* Toast in case of new board */}
      <dialog open={showToast}>
        <p> הלוח נוצר בהצלחה!</p>
        <button onClick={closeToast}>הבנתי, תודה</button>
      </dialog>
    </>
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
//       ids: ["123-123"],
//     },
//   };
// }
