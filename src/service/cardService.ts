import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
    getCard
};

export default cardService;
