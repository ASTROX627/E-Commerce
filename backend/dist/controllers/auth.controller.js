import User from "../models/user.model.js";
import { ConflictError } from "../errors/http-errors.js";
export async function signup(req, res) {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ConflictError("A user with this email already exists.");
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
}
export async function login(req, res) {
    res.send("login up route");
}
export async function logout(req, res) {
    res.send("logout up route");
}
//# sourceMappingURL=auth.controller.js.map