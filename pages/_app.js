import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  display: grid;
  grid-template-rows: 55px auto 35px;
`;

function App({ Component, pageProps }) {
  const [showSelect, setShowSelect] = useState(false);
  return (
    <>
      <Head>
        <title>משחק פרופסור קהילתי</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="description"
          content=" משחק פרופסור קהילתי - יוצרים לוחות ומשחקים. משחק זה נוצר בהשראת אתר הפרופסור ומאפשר לכם ליצור לוחות פרופסור  ​משלכם ולשחק בלוחות שנוצרו על ידי הקהילה"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://open-professor.vercel.app" />
        <meta property="og:title" content="משחק פרופסור קהילתי" />
        <meta
          property="og:description"
          content=" משחק פרופסור קהילתי - יוצרים לוחות ומשחקים. משחק זה נוצר בהשראת אתר הפרופסור ומאפשר לכם ליצור לוחות פרופסור  ​משלכם ולשחק בלוחות שנוצרו על ידי הקהילה"
        />
        <meta
          property="og:image"
          content="https://open-professor.vercel.app/android-chrome-512x512.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://open-professor.vercel.app"
        />
        <meta property="twitter:title" content="משחק פרופסור קהילתי" />
        <meta
          property="twitter:description"
          content=" משחק פרופסור קהילתי - יוצרים לוחות ומשחקים. משחק זה נוצר בהשראת אתר הפרופסור ומאפשר לכם ליצור לוחות פרופסור  ​משלכם ולשחק בלוחות שנוצרו על ידי הקהילה"
        />
        <meta
          property="twitter:image"
          content="https://open-professor.vercel.app/android-chrome-512x512.png"
        />
      </Head>

      <AppContainer>
        <Header setShowSelect={setShowSelect} />
        <Component {...pageProps} showSelect={showSelect} setShowSelect={setShowSelect} />
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
