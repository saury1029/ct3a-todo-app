import React, { useMemo } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Alert, Box } from "@mui/joy";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [state, setState] = React.useState({
    name: "",
    password: "",
  });
  const router = useRouter();
  const errorArr = useMemo(() => {
    return router.query.error
      ? (router.query.error as string).trim().split(" ")
      : null;
  }, [router.query.error]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void signIn("user-login", {
      name: state.name,
      password: state.password,
      callbackUrl: "/",
    });
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
      <form onSubmit={onSubmit}>
        <Sheet
          variant="outlined"
          sx={{
            width: 320,
            my: 4,
            py: 3,
            px: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 4,
            boxShadow: "md",
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              <b>欢迎，请登录</b>
            </Typography>
          </div>
          {errorArr && (
            <Alert color="danger" variant="soft">
              {errorArr?.join(", ")}
            </Alert>
          )}
          <FormControl>
            <FormLabel>用户名</FormLabel>
            <Input
              name="name"
              type="name"
              placeholder="请输入用户名"
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
              value={state.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>密码</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="请输入密码"
              value={state.password}
              onChange={(e) => {
                setState({ ...state, password: e.target.value });
              }}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} type="submit">
            登录
          </Button>
        </Sheet>
      </form>
    </Box>
  );
};

export default Login;
