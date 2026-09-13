import { beforeEach } from "node:test";
import { describe, it, expect, vi } from "vitest";
import { transporter } from "../../../lib/mailer.js";
import { sendEmail } from "./send-email.ts";

vi.mock("../../../lib/mailer.ts", () => ({
  transporter: { sendMail: vi.fn() },
}));

describe("send email", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls transporter.sendMail with the correct fields", async () => {
    vi.mocked(transporter.sendMail).mockResolvedValue({
      accepted: ["a@b.com"],
      rejected: [],
      response: "250 OK",
    } as any);

    await sendEmail({ to: "a@b.com", subject: "test", html: "<p>hi</p>" });

    expect(transporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "a@b.com",
        subject: "test",
        html: "<p>hi</p>",
      }),
    );
  });
});
