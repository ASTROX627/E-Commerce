import express, {} from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFoundHandler } from "./middlewares/not-found.js";
import routes from "./routes/index.route.js";
const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);
app.use(notFoundHandler);
export default app;
//# sourceMappingURL=app.js.map