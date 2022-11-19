import { Router } from "express";
import { cardController } from "../controller";

const router: Router = Router();

//* 명함 조회 - GET /card/:userId
router.get("/:userId", cardController.getCard);

export default router;
