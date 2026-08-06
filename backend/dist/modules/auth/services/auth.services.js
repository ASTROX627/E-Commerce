import { ConflictError } from "../../../errors/http-errors.js";
import User from "../../../models/user.model.js";
export async function createUser(name, email, password) {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ConflictError("A user with this email already exists.");
    }
    return User.create({ name, email, password });
}
//# sourceMappingURL=auth.services.js.map