import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/joy/CssBaseline";
import { type Session } from "next-auth";

import "~/styles/globals.css";

const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

const MyApp: AppType<{
  session: Session;
}> = ({ Component, pageProps }) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </CssVarsProvider>
  );
};

export default api.withTRPC(MyApp);
