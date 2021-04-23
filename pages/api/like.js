import db from "../../db";

export default async (req, res) => {
  const { id } = JSON.parse(req.body);

  try {
    const docRef = await db.collection("boards").doc(id)
    let currentLikes = docRef.likes;
    const response = await docRef.update({likes: ++currentLikes})
    res.status(200).json(response);
    
  } catch (error) {
    return res.status(400).json({
      error,
    });
    // Report error to Sentry or whatever
  }
};
