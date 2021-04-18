import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6971e0;
  background: linear-gradient(90deg, #6971e0 12%, #5157ad 98%);
  color: white;
`;
export default function Footer() {
  return (
    <Container>
      <p>
        פרויקט זה הוא פרויקט{" "}
        <a href="https://github.com/uriklar/professor/">קוד פתוח</a> בהשראת{" "}
        <a href="http://professor.amiacyb.org/">אתר הפרופסור</a>
      </p>
    </Container>
  );
}
