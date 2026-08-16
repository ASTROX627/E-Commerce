import { asyncHandler } from "../../../utils/async-handler.ts";
import type { Controller } from "../../../types/express.types.ts";
import { createUser } from "../services/create-user.ts";
import type { SignupRequestBody, SignupResponseBody } from "../types/auth.types.ts";

import { setRefreshCookie } from "../utils/set-refresh-cookie.ts";

export const signup: Controller<SignupRequestBody, SignupResponseBody> = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;
    const {user, tokens} = await createUser(name, email, password);
    setRefreshCookie(res, tokens.refreshToken);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: tokens.accessToken
    })
  },
);
