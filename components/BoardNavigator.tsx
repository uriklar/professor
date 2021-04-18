import { getBoardUrlFromId } from "../utils";
import { useStore } from "./Store";
import styled from "styled-components";
import { mediumUp } from "../styles/tokens";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  width: 100%;

  ${mediumUp} {
    width: 600px;
  }
`;

export default function BoardNavigator() {
  const {
    ids,
    board: { id },
  } = useStore();
  const index = ids.findIndex((_id) => _id === id);
  return (
    <Container>
      {ids[index - 1] && (
        <a href={getBoardUrlFromId(ids[index - 1])}>לוח קודם</a>
      )}
      {ids[index + 1] && (
        <a href={getBoardUrlFromId(ids[index + 1])}>לוח הבא</a>
      )}
    </Container>
  );
}
