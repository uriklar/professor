import { useEffect, useRef, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import BoardNavigator from "./BoardNavigator";

const API_KEY = "hfRXiZHVEfpBfzTO3v56APh6cuWyRueU";

export default function SuccessGif() {
  const [gif, setGif] = useState<any>();
  const dialog = useRef<HTMLDialogElement>();
  useEffect(() => {
    async function fetchData() {
      const gf = new GiphyFetch(API_KEY);
      const { data: _gif } = await gf.random({ tag: "yay" });
      setGif(_gif);
    }
    fetchData();
  }, []);

  const handleClick = (e) => {
    if (dialog.current && !dialog.current.contains(e.target)) {
      setGif(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <dialog open={!!gif} ref={dialog}>
      {gif && (
        <iframe
          src={gif.embed_url}
          width="480"
          height="480"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      )}
      <BoardNavigator />
    </dialog>
  );
}
