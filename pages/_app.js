import Link from "next/link";
import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
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
      <header>
        <Link href="/">
          <a>פרופסור</a>
        </Link>

        <div>
          <Link href="/create">
            <a>+ ליצירת לוח</a>
          </Link>
        </div>
      </header>
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
