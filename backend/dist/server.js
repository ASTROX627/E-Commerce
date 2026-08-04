import dns from "node:dns";
import express, {} from "express";
import { PORT } from "./config/global.js";
import authRoutes from "./routes/auth.route.js";
import connectToMongoDB from "./db/connect-to-mongoDB.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
dns.setServers(["8.8.8.8"]);
const app = express();
const port = PORT;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    connectToMongoDB();
});
export default app;
//# sourceMappingURL=server.js.map