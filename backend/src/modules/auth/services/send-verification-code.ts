import { OTP_EXPIRES_IN_SECONDS } from "../../../config/global.ts";
import { storeOtp } from "../../../repositories/otp.ts";
import { generateOTP } from "../../../utils/generate-otp.ts";
import { hashToken } from "../../../utils/hash-token.ts";
import { sendEmail } from "../../mail/services/send-email.ts";
import { buildVerificationEmail } from "../../mail/template/verification-email.ts";

export async function sendVerificationCode(email: string): Promise<void> {
  const otp = generateOTP();

  await storeOtp(
    "email-verification",
    email,
    hashToken(otp),
    OTP_EXPIRES_IN_SECONDS,
  );

  const { subject, html } = buildVerificationEmail(otp);

  await sendEmail({ to: email, subject, html });
}
