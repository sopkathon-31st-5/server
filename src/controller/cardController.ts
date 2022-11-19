import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { CreateCardDTO } from "../interfaces/CreateCardDTO";
import { cardService } from "../service";

//* 카드 생성
const createCard = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId)
        return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.OUT_OF_VALUE));

    const createCardDTO: CreateCardDTO = req.body;
    if (!createCardDTO.name || !createCardDTO.telNumber || !createCardDTO.type || !createCardDTO.address || !createCardDTO.introduce || createCardDTO.isDeliver == null)
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    const data = await cardService.createCard(+userId, createCardDTO);

    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_CARD_FAIL));
    }

    return res.status(sc.OK).send(success(sc.OK, rm.CREATE_CARD_SUCCESS, { cardId: data }));
};

//* 카드 수정
const updateCard = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId)
        return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.OUT_OF_VALUE));

    const createCardDTO: CreateCardDTO = req.body;
    if (!createCardDTO.name || !createCardDTO.telNumber || !createCardDTO.type || !createCardDTO.address || !createCardDTO.introduce || createCardDTO.isDeliver == null)
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    const data = await cardService.updateCard(+userId, createCardDTO);

    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.UPDATE_CARD_FAIL));
    }

    return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_CARD_SUCCESS, data));
};

//* 명함 조회
const getCard = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const data = await cardService.getCard(+userId);

    if (!data.card) {
        return res.status(400).json({ status: 404, message: rm.NO_USER });
    }

    return res
        .status(200)
        .json({ status: 200, message: "명함 조회 성공", data });
};

const cardController = {
    createCard,
    updateCard,
    getCard
};

export default cardController;
