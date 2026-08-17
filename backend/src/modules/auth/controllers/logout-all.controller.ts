import { UnauthorizedError } from "../../../errors/http-errors.ts";
import { deleteAllRefreshTokens } from "../../../repositories/refresh-token.ts";
import { incrementTokenVersion } from "../../../repositories/token-version.ts";
import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";

export const logoutAllDevice: Controller = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError("Authentication required.");
  }

  await incrementTokenVersion(req.user.id);
  await deleteAllRefreshTokens(req.user.id);

  res.status(200).json({ message: "Logout from all devices" });
});
