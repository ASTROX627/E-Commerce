import type { LogMeta } from "../types/logger.types.ts";
export declare const logger: {
    debug(message: string, meta?: LogMeta): void;
    info(message: string, meta?: LogMeta): void;
    warn(message: string, meta?: LogMeta): void;
    error(message: string, error?: unknown): void;
};
//# sourceMappingURL=logger.d.ts.map