import { IS_PRODUCTION } from "../config/global.ts";
import { LOG_LEVEL_PRIORITY } from "../constants/log-level-priority.ts";
import type { LogEntry, LogLevel, LogMeta } from "../types/logger.types.ts";

const currentLevel: LogLevel = IS_PRODUCTION ? "info" : "debug";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
}

function formatLog(level: LogLevel, message: string, meta?: LogMeta): string {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ? { meta } : {}),
  };
  return JSON.stringify(entry);
}

function errorToMeta(error: unknown): LogMeta {
  return error instanceof Error
    ? { name: error.name, message: error.message, stack: error.stack }
    : { error };
}

export const logger = {
  debug(message: string, meta?: LogMeta): void {
    if (shouldLog("debug")) {
      console.debug(formatLog("debug", message, meta));
    }
  },
  info(message: string, meta?: LogMeta): void {
    if (shouldLog("info")) {
      console.info(formatLog("info", message, meta));
    }
  },
  warn(message: string, meta?: LogMeta): void {
    if (shouldLog("warn")) {
      console.warn(formatLog("warn", message, meta));
    }
  },
  error(message: string, error?: unknown): void {
    if (shouldLog("error")) {
      console.error(formatLog("error", message, errorToMeta(error)));
    }
  },
};
