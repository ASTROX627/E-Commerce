import express, { Router, type Request, type Response } from "express";
import { login, logout, signup } from "../controllers/auth.controller.ts";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
