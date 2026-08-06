import type { HydratedDocument } from "mongoose";
import type { IUser } from "../../../types/user-modle.types.ts";
export declare function createUser(name: string, email: string, password: string): Promise<HydratedDocument<IUser>>;
//# sourceMappingURL=auth.services.d.ts.map