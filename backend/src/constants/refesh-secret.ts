import { JWT_REFRESH_SECRET } from "../config/global.ts";

export const REFRESH_SECRET = new TextEncoder().encode(JWT_REFRESH_SECRET);
