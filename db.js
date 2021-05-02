import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

const db = admin.firestore();

export default db;

export const getIds = async () => {
  const querySnapshot = await db.collection("boards").select().get();
  return querySnapshot.docs.map((doc) => doc.id);
};

export const getBoard = async (id) => {
  const snapshot = await db.collection("boards").doc(id).get();
  return snapshot.data();
};

export const getLikes = async () => {
  const querySnapshot = await db.collection("likes").get();
  console.log(querySnapshot.docs);
  return querySnapshot.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data();
    return acc;
  }, {});
};
