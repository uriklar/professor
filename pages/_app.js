import styled from "styled-components";
import "../styles/globals.css";
import Heade from "next/head";

const Container = styled.div``;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>פרופסור קהילתי</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
