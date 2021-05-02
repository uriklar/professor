import db from "../../db";
import admin from "firebase-admin";

const incrementByOne = admin.firestore.FieldValue.increment(1);

export default async (req, res) => {
  const { id } = JSON.parse(req.body);
  try {
    const likeRef = db.collection("likes").doc(id);
    const writeResult = await likeRef.update({ likes: incrementByOne });
    return res.status(200).json(writeResult);
  } catch (error) {
    return res.status(400).json({
      error,
    });
    // Report error to Sentry or whatever
  }
};
