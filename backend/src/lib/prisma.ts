import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../config/global.ts";
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString = DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

export { prisma };
