import mongoose, { type HydratedDocument } from "mongoose";
import type { IUser } from "../types/user-modle.types.ts";
import type { CartItem } from "../types/cart-item.types.ts";
import { UserRole } from "../enums/user-role.enum.ts";
import bcrypt from "bcryptjs";

const cartItemSchema = new mongoose.Schema<CartItem>(
  {
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "prodcut is required"],
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password must be at least 6 chatacters"],
    },
    cartItems: [cartItemSchema],
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (this: HydratedDocument<IUser>) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  this: IUser,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
