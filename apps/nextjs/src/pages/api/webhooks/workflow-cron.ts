/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import runWorkflow from "@wove/api/src/utils/chat/runWorkflow";
import { prisma } from "@wove/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { workflowId } = req.body;

  if (!workflowId) {
    res.status(400).end();
    return;
  }

  const workflow = await prisma.workflow.findFirst({
    where: { id: workflowId },
    include: {
      blocks: true,
    },
  });

  if (!workflow) {
    res.status(404).end();
    return;
  }

  const runs = await runWorkflow(workflow);

  await prisma.workflowRun.create({
    data: {
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

  res.status(200).end();
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
