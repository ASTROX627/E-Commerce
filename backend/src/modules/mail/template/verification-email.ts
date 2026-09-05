import type { EmailContent } from "../../../types/email.types.ts";

export function buildVerificationEmail(otp: string): EmailContent {
  return {
    subject: "Verify your email adderss",
    html: `
      <div style="font-family: sans-serif; max-width: 480px;">
        <h2>Verify your email</h2>
        <p>Your verification code is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p>This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  };
}
