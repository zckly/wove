import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workflowRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.workflow.findMany({
      orderBy: { id: "desc" },
      include: {
        blocks: true,
        runs: true,
      },
      where: {
        team: {
          members: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
      },
    });
  }),
  byId: protectedProcedure.input(z.string().min(1)).query(({ ctx, input }) => {
    return ctx.prisma.workflow.findFirst({
      where: { id: input },
      include: {
        blocks: {
          orderBy: {
            order: "asc",
          },
          include: {
            runs: {
              orderBy: { startedAt: "asc" },
            },
          },
        },
        runs: {
          orderBy: {
            startedAt: "desc",
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
              order: 0,
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
