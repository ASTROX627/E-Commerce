import express, { Router } from "express";
import { signup } from "../controllers/signup.controller.ts";
import { validate } from "../../../middlewares/validation.ts";
import { signupSchema } from "../validations/auth.validation.ts";
import { refresh } from "../controllers/refresh.controller.ts";
import { login } from "../controllers/login.controller.ts";
import { logout } from "../controllers/logout.controller.ts";


const router: Router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh)

export default router;
