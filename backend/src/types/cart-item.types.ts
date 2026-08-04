import type mongoose from "mongoose";

export interface CartItem {
  quantity: number;
  product: mongoose.Types.ObjectId;
}
