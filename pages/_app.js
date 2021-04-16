// import styled from "styled-components";
import "../styles/globals.scss";
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
            <span>פרויקט זה הוא פרויקט{" "}</span>
          <a href="https://github.com/uriklar/professor/">קוד פתוח</a> בהשראת{" "}
          <span>אתר </span>
          <a href="http://professor.amiacyb.org/">הפרופסור</a>
        </p>
      </footer>
    </>
  );
}

export default App;
