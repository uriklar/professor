import Dialog from "@reach/dialog";
import "@reach/dialog/styles.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import contributors from "../contributors";
import { isBrowser } from "../utils";
import { mediumUp } from "../styles/tokens";
import Button from "./common/Button";

const StyledDialog = styled(Dialog)`
  width: 80vw;
  ${mediumUp} {
    width: 50vw;
  }
`;
interface IVersion {
  number: number;
  text: string;
  contributor: keyof typeof contributors;
}

const VERSIONS: IVersion[] = [
  {
    number: 1,
    contributor: 1,
    text:
      "שינוי באופן ייצור מזהיי הלוחות. מהיום, המזהה של הלוח כבר לא יהיה מספר אקראי בן 4 ספרות אלא מספר רץ. כרגע אין כוונה לשנות את מספרי הלוחות שכבר קיימים.",
  },
  {
    number: 2,
    contributor: 4,
    text:
      "מהיום אפשר להוסיף ללוחות רמז! את הרמזים מזינים בטופס יצירת הלוח, והאפשרות לקבל רמז תופיע 2 דקות לאחר מציאת כל הרביעיות",
  },
  {
    number: 3,
    contributor: 2,
    text:
      ".אהבתם לוח? מהיום אפשר לתת לו 😍 ובכך לסמן למשתמשים אחרים שהלוח הזה טוב (האפשרות תופיע בסיום הלוח) ",
  },
  {
    number: 4,
    contributor: 5,
    text: "הוספנו קצת ריווח לאותיות כדי שיהיה קל יותר לקרוא",
  },
  {
    number: 6,
    contributor: 6,
    text: "מהיום ניתן לאפס לוח פתור. חפשו את ה 🔄 ליד שם הלוח.",
  },
];

const LOCAL_STORAGE_KEY = "openprofessor__version";

function getLastVersion() {
  if (!isBrowser()) {
    return {};
  }
  return parseInt(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || 0
  );
}

function NewItem({ version }) {
  const by = contributors[version.contributor];
  return (
    <li
      css={`
        list-style: none;
        padding: 14px;
      `}
    >
      <div
        css={`
          margin-bottom: 8px;
        `}
      >
        {version.text}
      </div>
      <div>
        תודה ל:{" "}
        <a target="_blank" href={by.linkedin} rel="noreferrer">
          {by.name}
        </a>
      </div>
    </li>
  );
}

export default function WhatsNew() {
  const lastLocalVersion = getLastVersion();
  const lastVersion = VERSIONS[VERSIONS.length - 1]?.number || 0;
  const whatsNew = VERSIONS.filter(
    (version) => version.number > lastLocalVersion
  );
  const [modalOpen, setModalOpen] = useState(false);

  // open modal if new version
  useEffect(() => {
    if (whatsNew.length) {
      setModalOpen(true);
    }
  }, [whatsNew]);

  // set version to latest and close modal
  const dismissModal = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(lastVersion));
    setModalOpen(false);
  };

  return (
    <StyledDialog isOpen={modalOpen} onDismiss={dismissModal}>
      <h2
        css={`
          text-align: center;
        `}
      >
        מה חדש בפרופסור?
      </h2>
      <ul
        css={`
          padding: 0;
        `}
      >
        {whatsNew.map((version) => (
          <NewItem key={version.number} version={version} />
        ))}
      </ul>
      <div
        css={`
          text-align: center;
        `}
      >
        <Button onClick={dismissModal}>מגניב, תודה</Button>
      </div>
    </StyledDialog>
  );
}
