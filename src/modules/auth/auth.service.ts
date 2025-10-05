import { User } from "@prisma/client"
import { prisma } from "../../config/db"
import bcrypt from "bcrypt"
import { createUserToken } from "../../utills/userTokens"
import AppError from "../../errorHelper/AppError"


const loginUser = async (payload: Partial<User>) => {
    const { email, password } = payload

    if (!email || !password) {
        throw new AppError(400, "Email and password are required")
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.password)

    if (!isPasswordValid) {
        throw new AppError(401, "Invalid email or password")
    }

    const userToken = createUserToken(user)

    const { password: pass, ...rest } = user


    return {
        user: rest,
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken
    }


}


export const authService = {
    loginUser
}