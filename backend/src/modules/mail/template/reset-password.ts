import type { EmailContent } from "../../../types/email.types.ts";

export function buildResetPasswordEmail(otp: string): EmailContent {
  return {
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px;">
        <h2>Reset your password</h2>
        <p>Your password reset code is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p>This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  };
}
