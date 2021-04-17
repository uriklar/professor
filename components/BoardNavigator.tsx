import { getBoardUrlFromId } from "../utils";
import { useStore } from "./Store";

export default function BoardNavigator() {
  const {
    ids,
    board: { id },
  } = useStore();
  const index = ids.findIndex((_id) => _id === id);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 600,
        paddingTop: 20,
      }}
    >
      {ids[index - 1] && (
        <a href={getBoardUrlFromId(ids[index - 1])}>לוח קודם</a>
      )}
      {ids[index + 1] && (
        <a href={getBoardUrlFromId(ids[index + 1])}>לוח הבא</a>
      )}
    </div>
  );
}
