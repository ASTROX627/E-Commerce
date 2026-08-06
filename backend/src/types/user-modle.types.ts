import type mongoose from "mongoose";
import { UserRole } from "../enums/user-role.enum.ts";
import type { CartItem } from "./cart-item.types.ts";

export interface IUserBase {
  name: string;
  email: string;
  password: string;
  cartItems: CartItem[];
  role: UserRole;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type IUser = mongoose.Document & IUserBase & IUserMethods;
