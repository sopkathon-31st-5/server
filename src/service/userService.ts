import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser =async(name:String, number:String) => {
    const user= await prisma.User.findUnique({
        where:{
            phoneNumber:number
        }
    });

    if(user)
        return user;

    const newUser=await prisma.User.create({
        data: {
            name:name,
            phoneNumber:number
        }
    });
    return newUser;
};

const userService= {
    createUser
};

export default userService;