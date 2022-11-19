import { Router } from "express";
import { cardController } from "../controller";

const router: Router = Router();

//* 카드 생성 - POST card/:userId
router.post('/:userId', cardController.createCard);
//* 명함 조회 - GET /card/:userId
router.get("/:userId", cardController.getCard);

export default router;
