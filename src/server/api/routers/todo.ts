import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(({ ctx }) => {
    console.log("🚀🔥✨todo.ts🚩6行 ", ctx.user);
    const todos = ctx.prisma.todo.findMany();
    return todos;
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          title: input.title,
          userId: ctx.user?.id,
        },
      });
      return todo;
    }),
});
