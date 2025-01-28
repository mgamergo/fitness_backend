import { Router } from "express";
import authRouter from "./auth/index";
import foodRouter from "./food/index";

const router = Router();

router.use("/auth", authRouter);
router.use('/food', foodRouter);

export default router;