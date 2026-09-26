import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { sendVerificationCode } from "../services/send-verification-code.ts";
import type { EmailRequestBody } from "../types/auth.types.ts";

export const resendVerificationCode: Controller<EmailRequestBody> =
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    await sendVerificationCode(email);
    res.status(200).json({ message: "Verification code send successfully" });
  });
