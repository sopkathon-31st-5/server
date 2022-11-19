import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../interfaces/UserDTO";
const prisma = new PrismaClient();

const createUser =async(name:string, number:string) => {
    const user= await prisma.user.findFirst({
        where:{
            phoneNumber:number
        }
    });

    if(user){
        const oldUser:UserDTO={id:user.id, name:user.name, phoneNumber:user.phoneNumber,isNew:false};
        return oldUser;
    }

    const newUser=await prisma.user.create({
        data: {
            name:name,
            phoneNumber:number
        }
    });
    const returnUser:UserDTO={id:newUser.id, name:newUser.name, phoneNumber:newUser.phoneNumber,isNew:true};
    return returnUser;
};

const userService= {
    createUser
};

export default userService;
