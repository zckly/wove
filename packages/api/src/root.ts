import { authRouter } from "./router/auth";
import { teamRouter } from "./router/team";
import { workflowRouter } from "./router/workflow";
import { workflowBlockRouter } from "./router/workflowBlock";
import { workflowRunRouter } from "./router/workflowRun";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  team: teamRouter,
  workflow: workflowRouter,
  workflowBlock: workflowBlockRouter,
  workflowRun: workflowRunRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
