import express, { type Express } from "express";
import { errorHandler } from "./middlewares/error-handler.ts";
import { notFoundHandler } from "./middlewares/not-found.ts";
import routes from "./routes/index.route.ts";

const app: Express = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
