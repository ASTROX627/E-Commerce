import { getLastEmailSent } from "./mail-mock.ts";

export function extractOtpFromLastEmail(email: string): string {
  const sentEmail = getLastEmailSent(email);
  const html = sentEmail?.html ?? "";
  const match = html.match(/(\d{6})/);

  if(!match){
    throw new Error("no otp found");
  }

  return match[1]!;
}
