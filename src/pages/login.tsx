import React from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Box } from "@mui/joy";
import { signIn } from "next-auth/react";

const Login = () => {
  const [state, setState] = React.useState({
    name: "",
    password: "",
  });
  const onSubmit = () => {
    signIn(
      "credentials",
      {
        redirect: true,
        callbackUrl: "/",
      },
      {}
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        pb: 8,
      }}
    >
      <form action="/api/auth/callback/credentials">
        <Sheet
          variant="outlined"
          sx={{
            width: 320,
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 4, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 4,
            boxShadow: "md",
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="name"
              placeholder="name"
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
              value={state.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={(e) => {
                setState({ ...state, password: e.target.value });
              }}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={onSubmit}>
            Log in
          </Button>
        </Sheet>
      </form>
    </Box>
  );
};

export default Login;
