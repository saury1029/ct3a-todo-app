import Document, { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/joy/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html
        style={{
          background: "#f9f9f9",
        }}
      >
        <Head />
        <body
          style={{
            minHeight: "100vh",
            background:
              "-webkit-linear-gradient(top, transparent 7px, #f5f5f5 0), -webkit-linear-gradient(left, transparent 7px, #f5f5f5 0)",
            backgroundSize: "8px 8px",
          }}
        >
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
