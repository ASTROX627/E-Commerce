import { IS_PRODUCTION } from "../config/global.js";
import { LOG_LEVEL_PRIORITY } from "../constants/log-level-priority.js";
const currentLevel = IS_PRODUCTION ? "info" : "debug";
function shouldLog(level) {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
}
function formatLog(level, message, meta) {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...(meta ? { meta } : {}),
    };
    return JSON.stringify(entry);
}
function errorToMeta(error) {
    return error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { error };
}
export const logger = {
    debug(message, meta) {
        if (shouldLog("debug")) {
            console.debug(formatLog("debug", message, meta));
        }
    },
    info(message, meta) {
        if (shouldLog("info")) {
            console.info(formatLog("info", message, meta));
        }
    },
    warn(message, meta) {
        if (shouldLog("warn")) {
            console.warn(formatLog("warn", message, meta));
        }
    },
    error(message, error) {
        if (shouldLog("error")) {
            console.error(formatLog("error", message, errorToMeta(error)));
        }
    },
};
//# sourceMappingURL=logger.js.map