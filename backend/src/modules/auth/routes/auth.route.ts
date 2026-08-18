import express, { Router } from "express";
import { signup } from "../controllers/signup.controller.ts";
import { validate } from "../../../middlewares/validation.ts";
import { signupSchema } from "../validations/signup.ts";
import { refresh } from "../controllers/refresh.controller.ts";
import { login } from "../controllers/login.controller.ts";
import { logout } from "../controllers/logout.controller.ts";
import { requireAuth } from "../../../middlewares/auth.middleware.ts";
import { logoutAllDevice } from "../controllers/logout-all.controller.ts";
import { loginSchema } from "../validations/login.ts";

const router: Router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", requireAuth, logout);
router.post("/refresh", refresh);
router.post("/logout-all", requireAuth, logoutAllDevice);

export default router;
