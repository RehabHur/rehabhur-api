import app from "./app.js";
import { getPrismaClient } from "./lib/prisma.js";

const port = Number(process.env.PORT?.trim() || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT debe ser un entero entre 1 y 65535");
}

const startServer = async (): Promise<void> => {
  await getPrismaClient().$connect();

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
};

void startServer().catch((error: unknown) => {
  console.error("No se pudo conectar a PostgreSQL:", error);
  process.exitCode = 1;
});