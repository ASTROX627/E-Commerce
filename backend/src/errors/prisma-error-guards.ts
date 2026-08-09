import { Prisma } from "../generated/prisma/client.ts";

export function isPrismaKnownError(
  err: unknown,
): err is Prisma.PrismaClientKnownRequestError {
  return err instanceof Prisma.PrismaClientKnownRequestError;
}

export function isPrismaValidationError(
  err: unknown,
): err is Prisma.PrismaClientValidationError {
  return err instanceof Prisma.PrismaClientValidationError;
}
