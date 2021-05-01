import styled from "styled-components";
import { LOCAL_STORAGE_KEY } from "../utils";

interface LikeProps {
  show: boolean;
  boardId: string;
}

const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
`;

const Dialog = styled.dialog`
  margin: auto;
  height: 350px;
  width: 400px;
  background-color: white;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  font-size: 1.5em;
`;
const Paragraph = styled.p`
  font-size: 1.2em;
  margin: 0 auto;
`;
const ButtonsContainer = styled.div`
  display: inline-block;
  margin: 1em;
`;
const Link = styled.a`
  font-size: 1em;
  width: max-content;
  margin: 1em;
  padding: 0.5em;
`;

async function onLike(id: string): Promise<any> {
  try {
    const response = await fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      const currentData =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...currentData,
          [id]: {
            ...(currentData[id] || {}),
            isLiked: true,
          },
        })
      );
    }
  } catch (e) {}
}

export default function SuccessDialog({ show, boardId }: LikeProps) {
  return show ? (
    <FlexContainer>
      <Dialog>
        <Title>בשעה טובה ומוצלחת,פתרת את הלוח!🥳</Title>
        <Paragraph>האם אהבת הלוח?</Paragraph>
        <ButtonsContainer>
          <Link
            onClick={() => {
              onLike(boardId);
            }}
          >
            כן
          </Link>
          <Link>לא</Link>
        </ButtonsContainer>
      </Dialog>
    </FlexContainer>
  ) : null;
}
