import mongoose from "mongoose";
import { MONGODB_URI } from "../config/global.ts";
import { logger } from "../utils/logger.ts";

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connected to MongoDB", error);
    process.exit(1);
  }
}

export default connectToMongoDB;
