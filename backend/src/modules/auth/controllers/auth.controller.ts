import type { Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../utils/async-handler.ts";
import type { Controller } from "../../../types/express.types.ts";
import { createUser } from "../services/auth.services.ts";
import type { SignupRequestBody, SignupResponseBody } from "../types/auth.types.ts";

export const signup: Controller<SignupRequestBody, SignupResponseBody> = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  },
);

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("login route");
  },
);

export const logout: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.send("logout route");
  },
);

export const test = async(req: Request, res: Response) => {
  res.send("test")
}
