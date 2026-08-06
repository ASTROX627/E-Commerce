import express from 'express';
import authRoutes from "../modules/auth/routes/auth.route.js";
const router = express.Router();
router.use("/auth", authRoutes);
export default router;
//# sourceMappingURL=index.route.js.map