import {Request, Response} from "express";
import { userService } from "../service";

const createUser=async(req:Request, res:Response) => {
    const body=req.body;

    const data=await userService.createUser(body.name, body.phoneNumber);

    if(data.name!=body.name)
        return res.status(404).json({status:404, message:"동일한 번호 존재로 생성 실패"});

    return res.status(200).json({status:200, message:"유저 생성 및 로그인 성공", data});
};

const userController={
    createUser
};
export default userController;