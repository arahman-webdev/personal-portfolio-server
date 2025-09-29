import { prisma } from "../../config/db"
import bcrypt from "bcrypt"
const loginUser = async({email, password}:{email:string, password:string})=>{
    const user = await prisma.user.findUnique({
        where:{email}
    })

    if(!user){
        throw new Error("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(isPasswordValid){
        return user
    }else{
        console.log("Password is incorrect")
    }
}


export const authService = {
    loginUser
}