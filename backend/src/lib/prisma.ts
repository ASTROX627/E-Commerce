import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../config/global.ts";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

const prisma = new PrismaClient({ adapter });

export { prisma };
