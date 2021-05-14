import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.header`
  padding: 0 40px;
  width: 100%;
  background: #6971e0;
  background: linear-gradient(90deg, #6971e0 12%, #5157ad 98%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 10px 0 rgba(0,0,0,0.5);
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SelectBoardButton = styled.div.attrs({
  tabIndex: 0,
  role: "button",
})`
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    text-decoration: underline;
  }
`;
export default function Header({ setShowSelect }) {
  const showSelect =
    typeof window !== "undefined" && window.location.pathname !== "/create";
  return (
    <Container>
      <div>
        {showSelect && (
          <SelectBoardButton onClick={() => setShowSelect((prev) => !prev)}>
            🎲 בחירת לוח
          </SelectBoardButton>
        )}
      </div>

      <Link href="/">
        <a>🤓 פרופסור</a>
      </Link>

      <Link href="/create">
        <a>📝 יצירת לוח</a>
      </Link>
    </Container>
  );
}
