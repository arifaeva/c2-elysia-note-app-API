import { Context } from "elysia";
import { prisma } from "../utils/prisma";

export const getSingleNote = async ({ params }: Context) => {
  const { id } = params;

  const note = await prisma.note.findFirst({
    where: {
      id,
    },
  });

  return note;
};
