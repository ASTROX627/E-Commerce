import { configureDNS } from "./config/dns.ts";
import connectToMongoDB from "./db/connect-to-mongoDB.ts";
import app from "./app.ts";
import { PORT } from "./config/global.ts";
import { logger } from "./utils/logger.ts";

async function startServer() {
  try {
    configureDNS();

    await connectToMongoDB();

    app.listen(PORT, () => {
      logger.info(`Server is running`, {
        port: PORT,
        url: `http://localhost:${PORT}`,
      });
    });
  } catch (error) {
    logger.error("Could not running server",error);
    process.exit(1);
  }
}

startServer();
