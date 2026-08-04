import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "prodcut is required"],
    },
}, { _id: false });
const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
//# sourceMappingURL=cart-item.model.js.map