import { PrismaClient } from "@prisma/client";
import { CreateCardDTO } from "../interfaces/createCardDTO";
const prisma = new PrismaClient();

//* 카드 생성
const createCard = async (userId: number, createCardDTO: CreateCardDTO) => {
    if(!userId) return null;
    console.log("userId", userId);

    const data = await prisma.card.create({
        data: {
            name: createCardDTO?.name,
            telNumber: createCardDTO?.telNumber,
            introduce: createCardDTO?.introduce,
            isDeliver: createCardDTO?.isDeliver,
            imageURL: createCardDTO?.imageURL,
            type: createCardDTO?.type,
            address: createCardDTO?.address,
            userId: userId,
        },
    });

    if(!data) return null;

    const weekdays = createCardDTO?.weekday
    //*weekdays 개수가 잘못됐는지 확인필요
    if(weekdays.length < 7 && weekdays.length > 0)
        return null;

    const weekday = await prisma.weekday.create({
        data: {
            sun: weekdays[0],
            mon: weekdays[1],
            tue: weekdays[2],
            wed: weekdays[3],
            thu: weekdays[4],
            fri: weekdays[5],
            sat: weekdays[6],
            cardId: data.id
        }
    });

    if(!weekday) return null;

    return data.id;
};

const cardService = {
    createCard,
}

export default cardService;
