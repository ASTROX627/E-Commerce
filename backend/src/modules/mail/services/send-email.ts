import { GMAIL_USER, MAIL_FROM_NAME } from "../../../config/global.ts";
import { transporter } from "../../../lib/mailer.ts";
import type { SendEmailInput } from "../../../types/email.types.ts";
import { logger } from "../../../utils/logger.ts";

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailInput): Promise<void> {
  await transporter.sendMail({
    from: `"${MAIL_FROM_NAME}" <${GMAIL_USER}>`,
    to,
    subject,
    html,
  });

  logger.info("Email sent", { to, subject });
}
