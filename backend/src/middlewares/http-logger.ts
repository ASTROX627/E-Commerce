import {pinoHttp} from "pino-http";
import { logger } from "../utils/logger.ts";

export const httpLogger = pinoHttp({
  logger,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.body.password",
      "req.body.newPassword",
    ],
    remove: true,
  },
});


