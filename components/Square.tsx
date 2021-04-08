import styled from "styled-components";
import { motion } from "framer-motion";

function getBgColor(state) {
  switch (state) {
    case "selected":
      return "blue";
    case "correct":
      return "purple";
    default:
      return "green";
  }
}

const Container = styled(motion.div)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ state }) => getBgColor(state)};
  border-radius: 8px;
  ${({ state }) => state !== "correct" && "cursor: pointer;"}
`;

interface Props {
  item: string;
  onSelect?: (item: string) => void;
  state: "correct" | "selected";
}

export default function Square({ item, onSelect = () => {}, state }: Props) {
  return (
    <Container layout state={state} onClick={() => onSelect(item)}>
      {item}
    </Container>
  );
}
