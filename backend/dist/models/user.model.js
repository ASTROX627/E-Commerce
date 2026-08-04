import mongoose, {} from "mongoose";
import { UserRole } from "../enums/user-role.enum.js";
import bcrypt from "bcryptjs";
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
const userSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.model.js.map