import { prisma } from "../lib/prisma.ts";
import { logger } from "../utils/logger.ts";

export async function connectToDB(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info("Connected to PostgreSQL");
  } catch (error) {
    logger.error({err: error}, "Faild to connect to PostgerSQL");
    process.exit(1);
  }
}
