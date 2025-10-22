import { Context, t } from "elysia";
import { prisma } from "../utils/prisma";

export const registerUserSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
};

export const registerUser = async ({ body, set }: Context) => {
  const { email, password } = body as { email: string; password: string };

  // Check collision -> Kita cek dulu apakah email ini sudah pernah didaftarkan atau belum
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    set.status = 400;
    return { message: "User already registered..." };
  }

  // hashing password
  const hashedPassword = await Bun.password.hash(password, "argon2d");

  // insert data
  user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  set.status = 201;
  return {
    message: "User registered succesfully!",
    user: { id: user.id, email: user.email },
  };
};
