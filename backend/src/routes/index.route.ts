import type { Router } from "express";
import express from 'express';
import authRoutes from "../modules/auth/routes/auth.route.ts"

const router: Router = express.Router();

router.use("/auth", authRoutes);

export default router;
