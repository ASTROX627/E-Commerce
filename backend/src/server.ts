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
      logger.info(
        {
          port: PORT,
          url: `http://localhost:${PORT}`,
        },
        `Server is running`,
      );
    });
  } catch (error) {
    logger.error({ err: error }, "Could not running server");
    process.exit(1);
  }
}

startServer();
