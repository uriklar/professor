import styled from "styled-components";
import "../styles/globals.css";

const Container = styled.div``;

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
