export type LogLevel = "debug" | "info" | "warn" | "error";
export interface LogMeta {
    [key: string]: unknown;
}
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    meta?: LogMeta;
}
//# sourceMappingURL=logger.types.d.ts.map