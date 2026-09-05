import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { sendVerificationCode } from "../services/send-verification-code.ts";
import { verifyOtp } from "../services/verify-code.ts";
import type {
  EmailRequestBody,
  EmailResponseBody,
} from "../types/auth.types.ts";

export const verifyEmailController: Controller<
  EmailRequestBody,
  EmailResponseBody
> = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const tokens = await verifyOtp(email, otp!);
  res.status(200).json({ email: email, accessToken: tokens.accessToken });
});

export const resendVerificationCode: Controller<EmailRequestBody> =
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    await sendVerificationCode(email);
    res.status(200).json({ message: "Verification code send successfully" });
  });
