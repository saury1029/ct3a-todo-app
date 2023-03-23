import { z } from "zod";
import { createTRPCRouter, protectiveProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: protectiveProcedure.query(({ ctx }) => {
    const todos = ctx.prisma.todo.findMany();
    return todos;
  }),
  create: protectiveProcedure
    .input(
      z.object({
        title: z.string(),
        userId: z.number(),
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

  toggle: protectiveProcedure
    .input(
      z.object({
        id: z.number(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });

      return todo;
    }),
  delete: protectiveProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });

      return todo;
    }),
});
