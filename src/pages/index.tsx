import { type NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const [title, setTitle] = useState("");
  const context = api.useContext();
  const todos = api.todo.getTodos.useQuery();

  const invalidateTodos = async () => {
    await context.todo.getTodos.invalidate();
  };

  const createMutation = api.todo.create.useMutation({
    async onSettled() {
      setTitle("");
      await invalidateTodos();
    },
  });
  const toggleMutation = api.todo.toggle.useMutation({
    async onSettled() {
      setTitle("");
      await invalidateTodos();
    },
  });
  const deleteMutation = api.todo.delete.useMutation({
    async onSettled() {
      setTitle("");
      await invalidateTodos();
    },
  });
  const session = useSession();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && session.data?.user.id) {
      createMutation.mutate({
        title,
        userId: session.data.user.id,
      });
    }
  };

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Box
          sx={{
            maxWidth: 720,
            px: "20px",
            mx: "auto",
          }}
        >
          <Typography
            level="h1"
            sx={{
              pt: 8,
              mb: 4,
            }}
            color="primary"
          >
            待办清单
          </Typography>
          <form onSubmit={onSubmit}>
            <Input
              value={title}
              size="lg"
              placeholder="待办项"
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <Box
            sx={{
              mt: 3,
            }}
          >
            {!todos.isLoading && (todos.data || []).length == 0 && (
              <Typography
                textAlign="center"
                sx={{
                  color: "#999",
                }}
              >
                暂无待办
              </Typography>
            )}
            {todos.data?.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{
                  mb: 2,
                  borderRadius: 4,
                }}
              >
                <Stack>
                  <Checkbox
                    checked={item.completed}
                    onChange={(e) => {
                      toggleMutation.mutate({
                        id: item.id,
                        completed: e.target.checked,
                      });
                    }}
                  />
                  <Typography>{item.title}</Typography>
                  <Button
                    size="sm"
                    onClick={() => {
                      deleteMutation.mutate({
                        id: item.id,
                      });
                    }}
                  >
                    &times;
                  </Button>
                </Stack>
              </Card>
            ))}
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Home;
