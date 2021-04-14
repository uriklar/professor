import styled from "styled-components";
import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>פרופסור קהילתי - יוצרים לוחות פרופסור ומשחקים</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="פרופסור קהילתי - יוצרים לוחות פרופסור ומשחקים"
        />
      </Head>
      <Component {...pageProps} />

      <footer>
        <p>
          פרויקט זה הוא פרויקט{" "}
          <a href="https://github.com/uriklar/professor/">קוד פתוח</a> בהשראת{" "}
          <a href="http://professor.amiacyb.org/">אתר הפרופסור</a>
        </p>
      </footer>
    </>
  );
}

export default App;
