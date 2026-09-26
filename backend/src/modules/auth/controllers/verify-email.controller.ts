import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { sendVerificationCode } from "../services/send-verification-code.ts";
import { verifyOtp } from "../services/verify-code.ts";
import type {
  EmailRequestBody,
  EmailResponseBody,
} from "../types/auth.types.ts";
import { setRefreshCookie } from "../utils/set-refresh-cookie.ts";

export const verifyEmailController: Controller<
  EmailRequestBody,
  EmailResponseBody
> = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const tokens = await verifyOtp(email, otp!);

  setRefreshCookie(res, tokens.refreshToken);
  res.status(200).json({ email: email, accessToken: tokens.accessToken });
});


