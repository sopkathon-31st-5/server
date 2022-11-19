import { Router } from "express";
import { userController } from "../controller";

const router: Router = Router();

router.post("/",userController.createUser);

export default router;
