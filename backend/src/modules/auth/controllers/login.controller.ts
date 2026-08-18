import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { loginUser } from "../services/login-user.ts";
import type {
  LoginRequestBody,
  LoginResponseBody,
} from "../types/auth.types.ts";
import { setRefreshCookie } from "../utils/set-refresh-cookie.ts";

export const login: Controller<LoginRequestBody, LoginResponseBody> =
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, tokens } = await loginUser(email, password);

    setRefreshCookie(res, tokens.refreshToken);
    res.status(200).json({
      id: user.id,
      email: user.email,
      accessToken: tokens.accessToken,
    });
  });
