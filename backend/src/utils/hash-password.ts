import argon2 from "argon2";

const ARGON2_OPTIONS: argon2.HashOptions = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return argon2.verify(hashedPassword, password);
}
