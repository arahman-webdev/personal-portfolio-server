import { prisma } from "../../config/db"

const loginUser = async({email, password}:{email:string, password:string})=>{
    const user = await prisma.user.findUnique({
        where:{email}
    })

    if(!user){
        throw new Error("User not found")
    }

    if(password === user.password){
        return user
    }else{
        throw new Error("Password is incorrect")
    }
}


const authService = {
    loginUser
}