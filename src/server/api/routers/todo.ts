import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(({ ctx }) => {
    const todos = ctx.prisma.todo.findMany();
    return todos;
  }),
});
