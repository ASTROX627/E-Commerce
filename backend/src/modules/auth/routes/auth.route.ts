import express, { Router } from "express";
import { login, logout, signup, test } from "../controllers/auth.controller.ts";
import { validate } from "../../../middlewares/validation.ts";
import { signupSchema } from "../validations/auth.validation.ts";


const router: Router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/test", test)

export default router;
