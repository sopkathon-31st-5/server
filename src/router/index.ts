import { Router } from "express";
import userRouter from "./userRouter";
import cardRouter from "./cardRouter";


const router: Router = Router();

router.use("/card", cardRouter);

export default router;