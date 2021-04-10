import db from "../../db";

export default async (req, res) => {
  const { board } = JSON.parse(req.body);

  try {
    const response = await db.collection("boards").doc(board.id).set(board);
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error,
    });
    // Report error to Sentry or whatever
  }
};
