import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { noteRouter } from "./routes/noteRouter";
import { authRouter } from "./routes/authRouter";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
    })
  )
  .use(authRouter)
  .use(noteRouter)
  .listen(3000);
console.log("NoteBE run at 3000");

// cmh25637l0001txa07gyadokz
