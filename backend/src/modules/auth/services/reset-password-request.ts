import { OTP_EXPIRES_IN_SECONDS } from "../../../config/global.ts";
import { UnauthorizedError } from "../../../errors/http-errors.ts";
import { storeOtp } from "../../../repositories/otp.ts";
import { generateOTP } from "../../../utils/generate-otp.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { sendEmail } from "../../mail/services/send-email.ts";
import { buildResetPasswordEmail } from "../../mail/template/reset-password.ts";
import { findUserByEmail } from "../repositories/auth-lookups.ts";

export async function resetPasswordRequest(email: string): Promise<void> {
  const user = await findUserByEmail(email);

  if (!user) return;

  const otp = generateOTP();
  await storeOtp(
    "password-reset",
    email,
    hashToken(otp),
    OTP_EXPIRES_IN_SECONDS,
  );

  const { subject, html } = buildResetPasswordEmail(otp);
  await sendEmail({ to: email, subject, html });
}
