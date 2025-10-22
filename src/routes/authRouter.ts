import Elysia, { t } from "elysia";
import { prisma } from "../utils/prisma";
import { registerUser, registerUserSchema } from "../controllers/registerUser";
import { loginUser, loginUserSchema } from "../controllers/loginUser";

export const authRouter = new Elysia()
  // Router
  .post("/register", registerUser, registerUserSchema)
  .post("/login", loginUser, loginUserSchema);
