import styled from "styled-components";
export default styled.button`
  padding: 4px 16px;
  background: #2e3161;
  color: white;
  font-size: 18px;
  cursor: pointer;

  &:focus-within {
    background: #6971e0;
    transition: 200ms ease;
  }
`;
