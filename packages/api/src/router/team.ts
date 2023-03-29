import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  activeTeam: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findFirst({
      where: { ownerId: ctx.session?.user.id },
    });
  }),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.team.create({
        data: {
          name: input.name || "Untitled team",
          owner: {
            connect: { id: ctx.session?.user.id },
          },
        },
      });
    }),
});
