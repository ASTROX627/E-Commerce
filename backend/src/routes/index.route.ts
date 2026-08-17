import type { Router } from "express";
import express from 'express';
import authRoutes from "../modules/auth/routes/auth.route.ts"
import { limiter } from "../middlewares/rate-limit.ts";

const router: Router = express.Router();

router.use("/auth", limiter, authRoutes);

export default router;
