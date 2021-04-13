import { IBoard } from "./types";

export const MOCK_BOARD: IBoard = {
  id: "uriklar-testing",
  items: [
    { text: "אחת", categoryId: "1" },
    { text: "שתיים", categoryId: "1" },
    { text: "שלוש", categoryId: "1" },
    { text: "ארבע", categoryId: "1" },
    { text: "אלף", categoryId: "2" },
    { text: "בית", categoryId: "2" },
    { text: "גימל", categoryId: "2" },
    { text: "דלת", categoryId: "2" },
    { text: "כלב", categoryId: "3" },
    { text: "חתול", categoryId: "3" },
    { text: "סוס", categoryId: "3" },
    { text: "נמר", categoryId: "3" },
    { text: "תל אביב", categoryId: "4" },
    { text: "ראשון לציון", categoryId: "4" },
    { text: "אילת", categoryId: "4" },
    { text: "עפולה", categoryId: "4" },
  ],
  answers: {
    "1": ["מספרים", "מספר"],
    "2": ["אותיות", "אות"],
    "3": ["חיות"],
    "4": ["ערים בישראל"],
  },
};
