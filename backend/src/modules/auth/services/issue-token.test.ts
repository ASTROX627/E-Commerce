import {describe, it, expect, beforeEach, vi} from "vitest";
import { getTokenVersion } from "../../../repositories/token-version.ts";
import { issueToken } from "./issue-token.ts";
import { UserRole, type User } from "../../../generated/prisma/client.ts";
import { storeRefreshToken } from "../../../repositories/refresh-token.ts";

vi.mock("../../../repositories/token-version.ts");
vi.mock("../../../repositories/refresh-token.ts");

const mockUser = {id: "user-1", role: UserRole.CUSTOMER} as unknown as User;

describe("issue-token", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  })

  it("embeds the current token version from redis into the access token", async () => {
    vi.mocked(getTokenVersion).mockResolvedValue(5);

    const {accessToken} = await issueToken(mockUser);
    const [, payloadB64] = accessToken.split(".");
    const payload = JSON.parse(Buffer.from(payloadB64!, "base64url").toString());

    expect(payload.ver).toBe(5);
  })

  it("stores the hashed refresh token with a ttl", async () => {
    vi.mocked(getTokenVersion).mockResolvedValue(0);

    const {refreshToken} = await issueToken(mockUser);

    expect(storeRefreshToken).toHaveBeenCalledWith(
      "user-1",
      expect.any(String),
      expect.any(String),
      expect.any(Number)
    )

    const storeHash = vi.mocked(storeRefreshToken).mock.calls[0]?.[2];
    expect(storeHash).not.toBe(refreshToken);
  })

  it("returns access token and refresh token", async () => {
    vi.mocked(getTokenVersion).mockResolvedValue(0);
    const tokens = await issueToken(mockUser);

    expect(tokens.accessToken).not.toBe(tokens.refreshToken);
  })
})
