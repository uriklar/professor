import db from "../../db";

const updateStrategies = new Map([
  ["INCREMENT", (number) => number + 1],
  ["DISCREMENT", (number) => number - 1],
]);

export default async (req, res) => {
  const { id, strategy } = JSON.parse(req.body);
  try {
    const docRef = await db.collection("boards").doc(id);
    let currentLikes = docRef.likes;
    const data = { likes: updateStrategies.get(strategy)(currentLikes) };
    const response = await docRef.update(data);
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      error,
    });
    // Report error to Sentry or whatever
  }
};
