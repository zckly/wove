import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workflowBlockRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
    return ctx.prisma.workflowBlock.findFirst({
      where: { id: input },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        workflowId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workflowBlock.create({
        data: {
          name: "New Block",
          description: "You are an AI assistant",
          workflow: {
            connect: {
              id: input.workflowId,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        blockId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workflowBlock.update({
        where: { id: input.blockId },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.workflowBlock.delete({ where: { id: input } });
  }),
});
