import { PrismaClient } from "@prisma/client";
import { CreateCardDTO } from "../interfaces/CreateCardDTO";
const prisma = new PrismaClient();

//* 카드 생성
const createCard = async (userId: number, createCardDTO: CreateCardDTO) => {
    if (!userId) return null;
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

    if (!data) return null;

    const weekdays = createCardDTO?.weekday
    if (weekdays.length < 7 && weekdays.length > 0)
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

    if (!weekday) return null;

    return data.id;
};

//* 명함 조회
const getCard = async (userId: number) => {
    const card = await prisma.card.findFirst({
        where: { userId: userId },
        select: {
            id: true,
            name: true,
            telNumber: true,
            introduce: true,
            isDeliver: true,
            imageURL: true,
            type: true,
            address: true,
        }
    })

    const weekday = await prisma.weekday.findFirst({
        where: { cardId: card?.id },
        select: {
            sun: true,
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
        }
    })

    const data = { card, weekday };
    return data;
}

const cardService = {
    createCard,
    getCard
};

export default cardService;
