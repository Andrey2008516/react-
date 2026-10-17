import http from "node:http";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { appRouter } from "./router.js";

const PORT = 3000;
const allowedOrigin = "http://127.0.0.1:5173";
const handler = createHTTPHandler({ router: appRouter });

const server = http.createServer((req, res) => {
  // Разрешаем запросы от локального Vite-клиента.
  const origin = req.headers.origin;
  if (origin === allowedOrigin || origin === "http://localhost:5173") {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type, trpc-accept" );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  handler(req, res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Сервер запущен: http://127.0.0.1:${PORT}`);
  console.log("Оставь это окно терминала открытым — здесь появится лог после нажатия кнопки.");
});
