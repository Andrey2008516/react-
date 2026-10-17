import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.string())
    .query(({ input }) => `Привет, ${input}!`),

  add: t.procedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .query(({ input }) => input.a + input.b),

  multiply: t.procedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .query(({ input }) => input.a * input.b),

  // Вызывается кнопкой в браузере и пишет сообщение в терминал сервера.
  logButton: t.procedure
    .input(z.object({ message: z.string().min(1).max(200) }))
    .mutation(({ input }) => {
      const time = new Date().toLocaleString("ru-RU");
      console.log(`[КНОПКА] ${time}: ${input.message}`);
      return { ok: true, message: "Сервер получил нажатие кнопки" };
    }),
});

export type AppRouter = typeof appRouter;
