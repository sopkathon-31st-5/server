import { Router } from "express";
import userRouter from "./userRouter";
import cardRouter from "./cardRouter";


const router: Router = Router();

router.use("/card", cardRouter);
router.use("/user", userRouter);

export default router;