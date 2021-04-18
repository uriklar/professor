import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.header`
  padding: 0 40px;
  width: 100%;
  background: #6971e0;
  background: linear-gradient(90deg, #6971e0 12%, #5157ad 98%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;
export default function Header() {
  return (
    <Container>
      <Link href="/">
        <a>פרופסור</a>
      </Link>

      <div>
        <Link href="/create">
          <a>+ ליצירת לוח</a>
        </Link>
      </div>
    </Container>
  );
}
