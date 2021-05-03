import { motion, AnimatePresence, useAnimation } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { Actions, useStore } from "./Store";
// dispatch({ type: Actions.SelectItem, payload: { item } });

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
`;

const Like = styled(motion.div).attrs({ tabIndex: 0 })`
  display: inline-block;
  font-size: 40px;
  cursor: pointer;
`;

const Text = styled.p`
  width: 70%;
  text-align: center;
  line-height: 1.4;
  font-weight: bold;
  margin-bottom: 32px;
  background: white;
  padding: 16px 32px;
  box-shadow: 3px 2px 8px -1px #000000;
`;

const X = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 30px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  background: transparent;
  border: none;
`;

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
  const { dispatch } = useStore();
  const [innerLike, setInnerLike] = useState(isLiked);
  const animation = useAnimation();

  async function onLike(id: string): Promise<any> {
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (response.status === 200) {
        dispatch({ type: Actions.LikeBoard, payload: {} });
        setShow(false);
      }
    } catch (e) {}
  }

  const onLikePress = async () => {
    setInnerLike(true);
    await animation.start({
      scale: 2.5,
      transition: { duration: 0.2, ease: "easeInOut" },
    });
    await animation.start({
      rotate: ["0deg", "20deg", "0deg"],
      transition: { duration: 0.2, ease: "easeInOut" },
    });
    onLike(boardId);
  };

  return (
    <AnimatePresence>
      {show && (
        <Container {...animatePresenceProps}>
          <X onClick={() => setShow(false)} {...animatePresenceProps}>
            ⓧ
          </X>
          <Text>אהבת את הלוח? כדאי לתת לו לייק שכולם ידעו כמה הוא טוב</Text>

          <Like
            animate={animation}
            onClick={onLikePress}
            onKeyPress={onLikePress}
          >
            {innerLike ? "😍" : "🤩"}
          </Like>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default LikeOverlay;
