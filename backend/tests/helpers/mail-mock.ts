import { beforeEach } from "node:test";
import { vi } from "vitest";
import { sendEmail } from "../../src/modules/mail/services/send-email.ts";

vi.mock("../../src/modules/mail/services/send-email.ts");

export function setupMailMock():void {
  beforeEach(() => {
    vi.mocked(sendEmail).mockResolvedValue(undefined);
  })
}

export function getLastEmailSent(email: string) {
  const calls = vi.mocked(sendEmail).mock.calls;

  return calls.filter((call) => call[0].to === email).at(-1)?.[0]
}
