import { User } from "@prisma/client"
import { prisma } from "../../config/db"
import bcrypt from "bcrypt"
import { createUserToken } from "../../utills/userTokens"


const loginUser = async (payload: Partial<User>) => {
    const { email, password } = payload
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.password)

    const userToken = createUserToken(user)

    const { password: pass, ...rest } = user

    if (isPasswordValid) {
        return {
            user,
            accessToken: userToken.accessToken,
            refreshToken: userToken.refreshToken
        }
    } else {
        console.log("Password is incorrect")
    }

}


export const authService = {
    loginUser
}