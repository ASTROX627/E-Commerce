import { configureDNS } from "./config/dns.js";
import connectToMongoDB from "./db/connect-to-mongoDB.js";
import app from "./app.js";
import { PORT } from "./config/global.js";
import { logger } from "./utils/logger.js";
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
    }
    catch (error) {
        logger.error("Could not running server", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map