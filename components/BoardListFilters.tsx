import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  sortDir: "asc" | "desc";
  setSortDir: Dispatch<SetStateAction<"asc" | "desc">>;
}

const BoardListFilters = ({
  open,
  query,
  setQuery,
  sortDir,
  setSortDir,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div
      css={`
        margin-right: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid #a3a3a3;
      `}
    >
      <input
        ref={inputRef}
        placeholder="חיפוש..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        css={`
          padding: 4px;
          margin-bottom: 10px;
        `}
      />

      <div
        css={`
          font-size: 14px;
          cursor: pointer;
        `}
        role="button"
        tabIndex={0}
        onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
      >
        <div
          css={`
            margin-bottom: 4px;
          `}
        >
          מיון לפי:
        </div>
        פנויים {sortDir === "asc" ? "למעלה" : "למטה"}{" "}
        {sortDir === "asc" ? "⬆" : "⬇"}
      </div>
    </div>
  );
};

export default BoardListFilters;
