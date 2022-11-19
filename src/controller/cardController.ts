import { Request, Response } from "express";
import { emit } from "process";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { CreateCardDTO } from "../interfaces/createCardDTO";
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

const cardController = {
    createCard,
}

export default cardController;
