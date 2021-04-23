import db from "../db";
import Board, { Props } from "../components/Board";
//import { MOCK_BOARD } from "../../mocks";

export default function Home({ board, ids, showSelect, setShowSelect }: Props) {
  return (
    <Board
      board={board}
      ids={ids}
      showSelect={showSelect}
      setShowSelect={setShowSelect}
    />
  );
}

export async function getServerSideProps({ params }) {
  // I tried creating a node script to seed the data, but had issues
  // If you feel like giving this a shot for a better solution then what I did here, feel free
  // Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP
  // const docRef = db.collection("boards").doc("testing");
  // await docRef.set(MOCK_BOARD);
  // Seed data - COMMENT THESE LINES OUT AFTER FIRST TIME RUNNING THE APP

  const querySnapshot = await db.collection("boards").select().get();
  const ids = querySnapshot.docs.map((doc) => doc.id);
  const randomBoard = ids[Math.floor(Math.random() * ids.length)];
  const snapshot = await db.collection("boards").doc(randomBoard).get();

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
