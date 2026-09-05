import { asyncHandler } from "../../../utils/async-handler.ts";
import type { Controller } from "../../../types/express.types.ts";
import { createUser } from "../services/create-user.ts";
import type { SignupRequestBody, SignupResponseBody } from "../types/auth.types.ts";

export const signup: Controller<SignupRequestBody, SignupResponseBody> = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  },
);
