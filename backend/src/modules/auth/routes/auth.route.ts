import express, { Router } from "express";
import { signup } from "../controllers/signup.controller.ts";
import { validate } from "../../../middlewares/validation.ts";
import { signupSchema } from "../validations/signup.ts";
import { refresh } from "../controllers/refresh.controller.ts";
import { login } from "../controllers/login.controller.ts";
import { logout } from "../controllers/logout.controller.ts";
import { requireAuth } from "../../../middlewares/require-auth.ts";
import { logoutAllDevice } from "../controllers/logout-all.controller.ts";
import { loginSchema } from "../validations/login.ts";
import { authLimiter } from "../../../middlewares/rate-limit.ts";
import { otpRateLimiter } from "../../../middlewares/otp-rate-limit.ts";
import { forgotPasswordSchema, resendCodeSchema, resetPasswordSchema, verifyEmailSchema } from "../validations/otp.ts";
import { forgotPassword } from "../controllers/forgot-password.controller.ts";
import { verifyEmailController } from "../controllers/verify-email.controller.ts";
import { resetPasswordController } from "../controllers/reset-password.controller.ts";
import { resendVerificationCode } from "../controllers/resend-verification-code.controller.ts";

const router: Router = express.Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/logout-all", requireAuth, logoutAllDevice);
router.post("/forgot-password", otpRateLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post("/verify-email", otpRateLimiter, validate(verifyEmailSchema), verifyEmailController);
router.post("/change-password", otpRateLimiter, validate(resetPasswordSchema), resetPasswordController);
router.post("/resend-verification-code", otpRateLimiter, validate(resendCodeSchema), resendVerificationCode);


export default router;
