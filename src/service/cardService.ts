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

//* 카드 수정
const updateCard = async (userId: number, createCardDTO: CreateCardDTO) => {
    if (!userId) return null;

    const cardId = await prisma.card.findFirst({
        where: { userId: userId },
        select: { id: true }
    })

    if (!cardId) return null;

    const card = await prisma.card.update({
        where: { id: cardId?.id },
        data: {
            name: createCardDTO?.name,
            telNumber: createCardDTO?.telNumber,
            introduce: createCardDTO?.introduce,
            isDeliver: createCardDTO?.isDeliver,
            imageURL: createCardDTO?.imageURL,
            type: createCardDTO?.type,
            address: createCardDTO?.address,
        },
    });

    if (!card) return null;

    const weekdays = createCardDTO?.weekday
    if (weekdays.length < 7 && weekdays.length > 0)
        return null;

    const weekdayId = await prisma.weekday.findFirst({
        where: { cardId: cardId?.id },
        select: { id: true }
    })

    if (!weekdayId) return null;

    const weekdayData = await prisma.weekday.update({
        where: {
            id: weekdayId?.id
        },
        data: {
            sun: weekdays[0],
            mon: weekdays[1],
            tue: weekdays[2],
            wed: weekdays[3],
            thu: weekdays[4],
            fri: weekdays[5],
            sat: weekdays[6],
            cardId: card.id
        }
    });

    if (!weekdayData) return null;

    const weekday = {
        sun: weekdayData.sun,
        mon: weekdayData.mon,
        tue: weekdayData.tue,
        wed: weekdayData.wed,
        thu: weekdayData.thu,
        fri: weekdayData.fri,
        sat: weekdayData.sat,
    }
    const result = { card, weekday }
    return result;
};


//* 명함 조회
const getCard = async (userId: number) => {
    const userName = await prisma.user.findFirst({
        where: { id: userId },
        select: {
            name: true
        }
    })
    
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

    const data = { userName, card, weekday };
    return data;
}

const cardService = {
    createCard,
    updateCard,
    getCard
};

export default cardService;
