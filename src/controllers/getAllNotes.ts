import { prisma } from "../utils/prisma";

export const getAllNotes = async () => {
  const notes = await prisma.note.findMany();
  return notes; // return-nya dalam bentuk array
};
