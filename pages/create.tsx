import React from "react";
import slugify from "slugify";
import BoardForm from "../components/BoardForm";
import { IBoard } from "../types";
import { makeid } from "../utils";

const ID = makeid(4);

const onSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  username: string,
  board: IBoard,
  boardUrl: string
) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({
        board: { ...board, id: slugify(`${username} ${ID}`) },
      }),
    });
    const responseJson = await response.json();

    if (typeof window !== "undefined") {
      window.location.href = `${boardUrl}?toast=new`;
    }
  } catch {}
};

export default function Create() {
  return <BoardForm id={ID} onSubmit={onSubmit} />;
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      ids: [
        "ARKADI-3351",
        "ARKADI-4524",
        "ARKADI-4686",
        "ARKADIFUN-4991",
        "ARKADIFUN-7753",
        "ARKADINEW-1155",
        "ARKADINEW-4144",
        "ARKADINEW-4262",
        "ARKADINEW-5839",
        "ARKADINEW-6392",
        "ARKADINEW-7427",
        "ARKADINEW-8813",
        "Amihai-2344",
        "Amihai-4278",
        "Amihai-5617",
        "Amihai-6648",
        "Amihai-9233",
        "Dana-3784",
        "Dana-5491",
        "Itay-1152",
        "Itay-1176",
        "Itay-1195",
        "Itay-1215",
        "Itay-1259",
        "Itay-1479",
        "Itay-1558",
        "Itay-1689",
        "Itay-1729",
        "Itay-1799",
        "Itay-1917",
        "Itay-2114",
        "Itay-2176",
        "Itay-2451",
        "Itay-2513",
        "Itay-2559",
        "Itay-2779",
        "Itay-2934",
        "Itay-2963",
        "Itay-3226",
        "Itay-3367",
        "Itay-3514",
        "Itay-3523",
        "Itay-3738",
        "Itay-3832",
        "Itay-3936",
        "Itay-4212",
        "Itay-4232",
        "Itay-4296",
        "Itay-4658",
        "Itay-4664",
        "Itay-4674",
        "Itay-4767",
        "Itay-4841",
        "Itay-4888",
        "Itay-5318",
        "Itay-5597",
        "Itay-5943",
        "Itay-6229",
        "Itay-6251",
        "Itay-6282",
        "Itay-6337",
        "Itay-6462",
        "Itay-6545",
        "Itay-6718",
        "Itay-6971",
        "Itay-7118",
        "Itay-7153",
        "Itay-7578",
        "Itay-7614",
        "Itay-7764",
        "Itay-8119",
        "Itay-8217",
        "Itay-8395",
        "Itay-8561",
        "Itay-8627",
        "Itay-8719",
        "Itay-8765",
        "Itay-8877",
        "Itay-9183",
        "Itay-9242",
        "Itay-9248",
        "Itay-9259",
        "Itay-9261",
        "Itay-9296",
        "Itay-9298",
        "Itay-9394",
        "Itay-9522",
        "Itay-9598",
        "Itay-9686",
        "Itay-9753",
        "Itay-9833",
        "Itay-9898",
        "NIMROD-7465",
        "Nimrod-6637",
        "Refael-4156",
        "Refael-4198",
        "Refael-6335",
        "Refael-7473",
        "Theme-8915",
        "Yael-Weill-3384",
        "Yael-Weill-5452",
        "Yael-Weill-6565",
        "Yael-Weill-7237",
        "Yael-Weill-8767",
        "efrat-2812",
        "efrat-5556",
        "efrat-7585",
        "kingmoran-4232",
        "mikimel1-8835",
        "rotem-1211",
        "rotem-1863",
        "rotem-4581",
        "rotem-4872",
        "rotem-5565",
        "rotem-7798",
        "rotem-8161",
        "rotemandmoran-6671",
        "uriandefrat-7789",
        "uriklar-1558",
        "uriklar-9154",
      ],
    },
  };
}
