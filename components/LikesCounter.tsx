import styled from "styled-components";

interface Props {
  current: number;
}

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
    ? " מישהו אהב את הלוח הזה "
    : String(number) + " אנשים אהבו את הלוח הזה";
};

export default function LikesCounter({ current }: Props) {
  return current ? (
    <Container>
      <Like>😍</Like>
      <Text>{getText(current)}</Text>
    </Container>
  ) : null;
}
