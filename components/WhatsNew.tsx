import Dialog from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useEffect, useState } from "react";
import contributors from "../contributors";
import { isBrowser } from "../utils";

interface IVersion {
  number: number;
  text: string;
  contributor: keyof typeof contributors;
}

const VERSIONS: IVersion[] = [];

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
    <Dialog isOpen={modalOpen} onDismiss={dismissModal}>
      <h2
        css={`
          text-align: center;
        `}
      >
        מה חדש בפרופסור?
      </h2>
      <ul>
        {whatsNew.map((version) => (
          <NewItem key={version.number} version={version} />
        ))}
      </ul>
      <div
        css={`
          text-align: center;
        `}
      >
        <button onClick={dismissModal}>מגניב, תודה</button>
      </div>
    </Dialog>
  );
}
