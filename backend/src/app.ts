import express, { type Express } from "express";
import { errorHandler } from "./middlewares/error-handler.ts";
import { notFoundHandler } from "./middlewares/not-found.ts";
import routes from "./routes/index.route.ts";
import { CLIENT_URL, IS_DEVELOPMENT } from "./config/global.ts";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./docs/swagger.ts";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { httpLogger } from "./middlewares/http-logger.ts";
import cors from "cors"

const app: Express = express();

app.use(helmet())
app.use(httpLogger)
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}))
app.use(cookieParser());
app.use("/api", routes);

if(IS_DEVELOPMENT){
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
