import { asyncHandler } from "../../../utils/async-handler.js";
import { createUser } from "../services/auth.services.js";
export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    res.status(201).json({ id: user._id.toString(), name: user.name, email: user.email });
});
export const login = asyncHandler(async (req, res) => {
    res.send("login route");
});
export const logout = asyncHandler(async (req, res) => {
    res.send("logout route");
});
export const test = async (req, res) => {
    res.send("test");
};
//# sourceMappingURL=aut.controller.js.map