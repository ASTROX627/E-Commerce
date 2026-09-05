import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { resetPasswordRequest } from "../services/reset-password-request.ts";
import type { EmailRequestBody } from "../types/auth.types.ts";

export const forgotPassword: Controller<EmailRequestBody> = asyncHandler(
  async (req, res) => {
    const { email } = req.body;
    await resetPasswordRequest(email);
    res.status(200).json({
      message:
        "If an account with this email exists, a reset code has been sent.",
    });
  },
);
