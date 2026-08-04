import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import { ConflictError } from "../errors/http-errors.ts";

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ConflictError("A user with this email already exists.");
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
}

export async function login(req: Request, res: Response) {
  res.send("login up route");
}

export async function logout(req: Request, res: Response) {
  res.send("logout up route");
}
