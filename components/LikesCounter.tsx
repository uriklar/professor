import styled from "styled-components";
import { useStore } from "./Store";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 6px;
`;

const Text = styled.span`
  font-size: 14px;
  color: #6d6d6d;
`;

const Like = styled.span`
  display: inline-block;
  margin-left: 6px;
`;
const getText = (number: number): string => {
  return number === 1
    ? "הלוח הזה קיבל לייק"
    : String(number) + " אנשים אהבו את הלוח הזה";
};

export default function LikesCounter() {
  const {
    state: { likes },
  } = useStore();
  return likes ? (
    <Container>
      <Like>😍</Like>
      <Text>{getText(likes)}</Text>
    </Container>
  ) : null;
}
