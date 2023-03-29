import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const workflowRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workflow.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
    return ctx.prisma.workflow.findFirst({
      where: { id: input },
      include: {
        blocks: {
          include: {
            runs: {
              orderBy: { startedAt: "asc" },
            },
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), teamId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workflow.create({
        data: {
          name: input.name || "Untitled workflow",
          team: {
            connect: { id: input.teamId },
          },
          blocks: {
            create: {
              name: "Untitled block",
              description: "You are an AI assistant.",
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workflow.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.workflow.delete({ where: { id: input } });
  }),
});
