import dotenv from "dotenv";
import { validateEnv } from "../utils/validate-env.ts";
import { parseDurationToSeconds } from "../utils/duration.ts";
dotenv.config();

export const PORT = process.env.PORT;
export const DNS_SERVERS = process.env.DNS_SERVERS?.split(",") ?? [];
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const DATABASE_URL = process.env.DATABASE_URL;
export const REDIS_URL = process.env.REDIS_URL;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const JWT_ISSUER = process.env.JWT_ISSUER;
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
export const JWT_CLIENT_ID = process.env.JWT_CLIENT_ID;
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN ?? "15m";
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN ?? "7d";


validateEnv({
  DATABASE_URL,
  REDIS_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_CLIENT_ID,
});

export const JWT_REFRESH_EXPIRES_IN_SECONDS = parseDurationToSeconds(
  JWT_REFRESH_EXPIRES_IN,
);
