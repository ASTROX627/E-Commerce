import { UnauthorizedError } from "../../../errors/http-errors.ts";
import type { User } from "../../../generated/prisma/client.ts";
import type { TokenPair } from "../../../types/token.types.ts";
import { comparePassword } from "../../../utils/compare-password.ts";

import { findUserByEmail } from "../repositories/auth-lookups.ts";
import { issueToken } from "./issue-token.ts";

export async function loginUser(
  email: string,
  password: string,
): Promise<{ user: User; tokens: TokenPair }> {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const tokens = await issueToken(user);

  return { user, tokens };
}
