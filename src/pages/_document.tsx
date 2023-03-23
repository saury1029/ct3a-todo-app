import Document, { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/joy/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body
          style={{
            background: "#f5f5f5",
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
