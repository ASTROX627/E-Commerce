import type { Request, Response } from "express";
import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { logoutUser } from "../services/logout-user.ts";

export const logout: Controller = asyncHandler(async(req: Request, res: Response) => {
  const rawRefreshToken = req.cookies?.["refreshToken"] as string | undefined;

  if(rawRefreshToken){
    await logoutUser(rawRefreshToken);
  }

  res.clearCookie("refreshToken", { path: "/api/auth" });
  res.status(200).json({message: "logged out successfully"});
})
