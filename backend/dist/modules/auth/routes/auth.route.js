import express, { Router } from "express";
import { login, logout, signup, test } from "../controllers/aut.controller.js";
import { validate } from "../../../middlewares/validation.js";
import { signupSchema } from "../validations/auth.validation.js";
const router = express.Router();
router.post("/signup", validate(signupSchema), signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/test", test);
export default router;
//# sourceMappingURL=auth.route.js.map