import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collectionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.collection.create({
        data: {
          name: input.name,
          user: {
            connect: { id: ctx.session?.user.id },
          },
        },
      });
    }),
  createMany: protectedProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.collection.createMany({
        data: input.names.map((name) => ({
          name,
          userId: ctx.session?.user.id,
        })),
      });
    }),
});
