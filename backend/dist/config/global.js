import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DNS_SERVERS = process.env.DNS_SERVERS?.split(",") ?? [];
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
//# sourceMappingURL=global.js.map