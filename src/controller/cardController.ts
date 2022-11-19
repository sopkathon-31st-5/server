import { Request, Response } from "express";
import { emit } from "process";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { cardService } from "../service";

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
    getCard
};

export default cardController;
