import { Context, t } from "elysia";
import { prisma } from "../utils/prisma";

export const loginUserSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
};

export const loginUser = async ({ body, set }: Context) => {
  const { email, password } = body as { email: string; password: string };

  // find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    set.status = 404;
    return { message: "User not found" };
  }

  // check password
  const isPassMatch = await Bun.password.verify(
    password,
    user.password,
    "argon2d"
  );

  if (!isPassMatch) {
    set.status = 401;
    return { message: "Invalid password" };
  }

  // generate session Id
  const session = await prisma.session.create({
    data: {
      user: {
        connect: {
          email,
        },
      },
    },
  });

  return { sessionId: session.id };
};
