import { configureDNS } from "./config/dns.ts";
import app from "./app.ts";
import { PORT } from "./config/global.ts";
import { logger } from "./utils/logger.ts";
import { connectToDB } from "./db/connect-to-db.ts";
import { connectToRedis } from "./db/connect-to-redis.ts";

async function startServer() {
  try {
    configureDNS();

    await connectToDB();
    await connectToRedis();

    app.listen(PORT, () => {
      logger.info(`Server is running`, {
        port: PORT,
        url: `http://localhost:${PORT}`,
      });
    });
  } catch (error) {
    logger.error("Could not running server", error);
    process.exit(1);
  }
}

startServer();
