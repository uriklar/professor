import { motion, AnimatePresence, useAnimation } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { LOCAL_STORAGE_KEY } from "../utils";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(100, 181, 237, 0.8);
  z-index: 1;
  font-size: 20px;
  color: white;
  text-shadow: 1px 1px #5158ad;
`;

const Like = styled(motion.div)`
  display: inline-block;
  font-size: 40px;
  cursor: pointer;
  margin-top: 8px;
`;

const Heart = styled.div<{ isLiked: boolean }>`
  position: relative;
  width: 100px;
  height: 90px;
  float: left;
  cursor: pointer;
  :before,
  :after {
    position: absolute;
    content: "";
    top: 0;
    width: 25px;
    height: 40px;
    border-radius: 25px 25px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
    background: ${({ isLiked }) => (isLiked ? "#fc2e5a" : "#ffb0c1")};
  }
  :after {
    right: 50%;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
  :before {
    left: 50%;
  }
`;

const Text = styled.p`
  width: 70%;
  text-align: center;
  line-height: 1.4;
  font-weight: bold;
  margin-bottom: 32px;
`;

const X = styled(motion.div)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 30px;
  cursor: pointer;
`;

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
    setTimeout(cb, 2000);
  }
}

interface Props {
  show: boolean;
  boardId: string;
  setShow: (value: React.SetStateAction<boolean>) => void;
  isLiked: boolean;
}

const animatePresenceProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const LikeOverlay = ({ show, boardId, setShow, isLiked }: Props) => {
  const [innerLike, setInnerLike] = useState(isLiked);
  const animation = useAnimation();
  return (
    <AnimatePresence>
      {show && (
        <Container {...animatePresenceProps}>
          <X onClick={() => setShow(false)} {...animatePresenceProps}>
            ⓧ
          </X>
          <Text>אהבת את הלוח? כדאי לתת לו לייק שכולם ידעו כמה הוא טוב</Text>

          {/* <Heart
            isLiked={isLiked}
            onClick={() => onLike(boardId, () => setShow(false))}
          /> */}
          <Like
            animate={animation}
            onClick={async () => {
              setInnerLike(true);
              await animation.start({
                scale: 2.5,
                transition: { duration: 0.2, ease: "easeInOut" },
              });
              await animation.start({
                rotate: ["0deg", "20deg", "0deg"],
                transition: { duration: 0.2, ease: "easeInOut" },
              });
              onLike(boardId, () => setShow(false));
            }}
          >
            {innerLike ? "😍" : "🤩"}
          </Like>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default LikeOverlay;
