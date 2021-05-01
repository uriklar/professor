import styled from "styled-components";

import Image from "next/image";

interface Props {
  current: number;
}

const Container = styled.div`
  display: flex;
`;
const Text = styled.span`
  margin: auto;
`;

const getText = (number: number): string => {
  return number === 1
    ? " מישהו אהב את הלוח הזה "
    : String(number) + " אהבו את הלוח הזה ";
};

export default function LikesCounter({ current }: Props) {
  return current ? (
    <Container>
      <Image src="/public/like.svg" height={30} width={30} />
      <Text>{getText(current)}</Text>
    </Container>
  ) : null;
}
