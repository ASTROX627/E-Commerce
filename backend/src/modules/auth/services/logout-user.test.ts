import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifyRefreshToken } from "../../../utils/verfify-refresh-token.ts";
import type { RefreshTokenPayload } from "../../../types/token.types.ts";
import { logoutUser } from "./logout-user.ts";
import { deleteRefreshToken } from "../../../repositories/refresh-token.ts";

vi.mock("../../../utils/verfify-refresh-token.ts");
vi.mock("../../../repositories/refresh-token.ts");

describe("logout user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes the refresh token", async () => {
    vi.mocked(verifyRefreshToken).mockResolvedValue({
      sub: "user-1",
      jti: "jti-1",
    } as unknown as RefreshTokenPayload);

    await logoutUser("valid-refresh-token");

    expect(deleteRefreshToken).toHaveBeenCalledWith("user-1", "jti-1");
  });
});
