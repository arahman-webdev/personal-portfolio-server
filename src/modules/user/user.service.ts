import { prisma } from "../../config/db"
import AppError from "../../errorHelper/AppError"

const getSingleUser = async (id: number) => {

    const isExistingUser = await prisma.user.findUnique({
        where:{id}
    })

    if(!isExistingUser){
        throw new AppError(404, "User not found")
    }

    return isExistingUser
}



export const userSerivice = {
    getSingleUser
}