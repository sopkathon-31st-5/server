import { Router } from "express";
import { cardController } from "../controller";

const router: Router = Router();

//* 카드 생성 - POST card/:userId
router.post('/:userId', cardController.createCard);
//* 카드 수정 - PATCH card/:userId
router.patch('/:userId', cardController.updateCard);
//* 명함 조회 - GET /card/:userId
router.get("/:userId", cardController.getCard);

export default router;
