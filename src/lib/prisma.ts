import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { getDatabaseConnectionString } from "../config/database.js";

let client: PrismaClient | undefined;

export const getPrismaClient = (): PrismaClient => {
  if (!client) {
    client = new PrismaClient({
      adapter: new PrismaPg({ connectionString: getDatabaseConnectionString() }),
    });
  }

  return client;
};