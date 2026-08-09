import { prisma } from "../lib/prisma.ts";
import { logger } from "../utils/logger.ts";

export async function connectToDB(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info("Connected to PostgreSQL");
  } catch (error) {
    logger.error("Failed to connect PostgreSQL", error);
    process.exit(1);
  }
}
