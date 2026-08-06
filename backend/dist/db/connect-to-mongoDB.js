import mongoose from "mongoose";
import { MONGODB_URI } from "../config/global.js";
import { logger } from "../utils/logger.js";
async function connectToMongoDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info("Connected to MongoDB");
    }
    catch (error) {
        logger.error("Failed to connected to MongoDB", error);
        process.exit(1);
    }
}
export default connectToMongoDB;
//# sourceMappingURL=connect-to-mongoDB.js.map