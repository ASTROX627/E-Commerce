import argon2 from "argon2";

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return argon2.verify(hashedPassword, password);
}
