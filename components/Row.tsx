import styled from "styled-components";
import { motion } from "framer-motion";
import { IItem } from "../types";
import Square from "./Square";

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

interface Props {
  items: IItem[];
}
export default function Row({ items }: Props) {
  return (
    <Container layout>
      {items.map((item) => (
        <Square item={item} key={item.text} />
      ))}
    </Container>
  );
}
