import Dialog from "@reach/dialog";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "@reach/dialog/styles.css";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// removes query parameter
function delQuery(asPath) {
  return asPath.split("?")[0];
}

function useDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const closeDialog = () => setShowDialog(false);
  const router = useRouter();

  useEffect(() => {
    const { toast } = router.query;
    if (toast === "new") {
      setShowDialog(true);
      // remove the toast=new query param
      router.replace(delQuery(router.asPath));
    }
  }, [router]);

  return {
    showDialog,
    closeDialog,
  };
}

export default function BoardCreatedDialog() {
  const { showDialog, closeDialog } = useDialog();
  return (
    <Dialog isOpen={showDialog} onDismiss={closeDialog}>
      <ContentContainer>
        <p> הלוח נוצר בהצלחה!</p>
        <button onClick={closeDialog}>הבנתי, תודה</button>
      </ContentContainer>
    </Dialog>
  );
}
