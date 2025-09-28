import { Request, Response } from "express"
import { authService } from "./auth.service"

const loginUser = async(req:Request, res:Response)=>{
    try{
        const result = await authService.loginUser(req.body)

        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: result
        })
    }catch(err){
        console.log(err)
    }
}

export const authControlelr = {
    loginUser
}