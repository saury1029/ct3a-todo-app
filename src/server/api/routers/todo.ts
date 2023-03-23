import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(({ ctx }) => {
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
          userId: Number(ctx.user?.id),
        },
      });
      return todo;
    }),
});
