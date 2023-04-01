import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import runWorkflow from "../utils/chat/runWorkflow";

export const workflowRunRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ workflowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const workflow = await ctx.prisma.workflow.findFirst({
        where: { id: input.workflowId },
        include: {
          blocks: true,
        },
      });

      if (!workflow) {
        throw new Error("Workflow not found");
      }

      const runs = await runWorkflow(workflow);

      // Now update the DB
      return ctx.prisma.workflowRun.create({
        data: {
          // TODO: THIS IS WRONG!!
          startedAt: new Date(),
          endedAt: new Date(),
          workflow: {
            connect: { id: workflow.id },
          },
          blocks: {
            create: runs.map((run) => ({
              block: {
                connect: { id: run.blockId },
              },
              logs: run.logs,
              status: "SUCCESS",
              startedAt: new Date(),
            })),
          },
        },
      });
    }),
});
