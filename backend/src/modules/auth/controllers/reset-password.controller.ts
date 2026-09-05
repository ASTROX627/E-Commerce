import type { Controller } from "../../../types/express.types.ts";
import { asyncHandler } from "../../../utils/async-handler.ts";
import { resetPassword } from "../services/reset-password.ts";
import type { EmailRequestBody } from "../types/auth.types.ts";

export const resetPasswordController: Controller<EmailRequestBody> =
  asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    await resetPassword(email, otp!, newPassword!);
    res.status(200).json({ message: "password has been reset successfully" });
  });
