import { authRouter } from "./router/auth";
import { collectionRouter } from "./router/collection";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  collection: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
