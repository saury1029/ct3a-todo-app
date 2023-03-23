import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const find = await ctx.prisma.user.findUnique({
        where: {
          name: input.name,
        },
      });
      if (find) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "用户已存在",
        });
      }

      await ctx.prisma.user.create({
        data: {
          name: input.name,
          password: input.password,
        },
      });

      return true;
    }),
});
