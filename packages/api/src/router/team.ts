import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany({
      where: {
        // For now only return teams that the user owns
        ownerId: ctx.session?.user.id,
      },
    });
  }),
  activeTeam: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findFirst({
      where: { ownerId: ctx.session?.user.id },
    });
  }),
  create: protectedProcedure
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
