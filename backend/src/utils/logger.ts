import pino from "pino";
import { IS_PRODUCTION } from "../config/global.ts";

const options: pino.LoggerOptions = {
  level: IS_PRODUCTION ? "info" : "debug"
}

if(!IS_PRODUCTION){
  options.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard"
    }
  }
};

export const logger = pino(options);
