import type { HydratedDocument } from "mongoose";
import { ConflictError } from "../../../errors/http-errors.ts";
import User from "../../../models/user.model.ts";
import type { IUser } from "../../../types/user-modle.types.ts";

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<HydratedDocument<IUser>> {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ConflictError("A user with this email already exists.");
  }
  return User.create({ name, email, password });
}
