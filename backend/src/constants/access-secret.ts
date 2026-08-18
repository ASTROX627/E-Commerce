import { JWT_ACCESS_SECRET } from "../config/global.ts";

export const ACCESSS_SECRET = new TextEncoder().encode(JWT_ACCESS_SECRET!);
