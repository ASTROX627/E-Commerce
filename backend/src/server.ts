import dns from "node:dns";
import express, { type Express } from "express";
import { PORT } from "./config/global.ts";
import authRoutes from "./routes/auth.route.ts";
import connectToMongoDB from "./db/connect-to-mongoDB.ts";
import { errorHandler } from "./middlewares/error-handler.middleware.ts";

dns.setServers(["8.8.8.8"]);

const app: Express = express();
const port = PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  connectToMongoDB();
});

export default app;
