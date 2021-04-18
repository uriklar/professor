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
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="משחק פרופסור קהילתי - יוצרים לוחות פרופסור ומשחקים"
        />
      </Head>

      <AppContainer>
        <Header setShowSelect={setShowSelect} />
        <Component {...pageProps} showSelect={showSelect} />
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
