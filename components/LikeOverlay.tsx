import React from "react";
import styled from "styled-components";
import { LOCAL_STORAGE_KEY } from "../utils";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(124, 124, 124, 0.842);
  z-index: 1;
  font-size: 20px;
  .heart {
    position: relative;
    width: 100px;
    height: 90px;
    float: left;
  }
  .heart:before,
  .heart:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: #fc2e5a;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }
  .heart:after {
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
`;
interface Props {
  show: boolean;
  boardId: string;
  close: () => void;
}

async function onLike(id: string, cb: () => any): Promise<any> {
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
  } catch (e) {
  } finally {
    cb();
  }
}

const LikeOverlay = ({ show, boardId, close }: Props) => {
  return show ? (
    <Container>
      <div
        onClick={() => {
          close();
        }}
        css={`
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 30px;
        `}
      >
        ⓧ
      </div>
      <p
        css={`
          width: 70%;
          text-align: center;
          line-height: 1.4;
          font-weight: bold;
        `}
      >
        אהבת את הלוח?? כדאי לתת לו לייק כדי שגם אחרים ידעו שהוא טוב
      </p>

      <div
        onClick={() => {
          onLike(boardId, close);
        }}
      >
        <div className="heart"></div>
      </div>
    </Container>
  ) : null;
};

export default LikeOverlay;
