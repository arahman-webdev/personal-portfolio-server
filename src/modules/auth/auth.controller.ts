import { Request, Response } from "express"
import { authService } from "./auth.service"
import { setAuthCookie } from "../../utills/setCookies"

const loginUser = async(req:Request, res:Response)=>{
    try{
        const loginInfo = await authService.loginUser(req.body)

        setAuthCookie(res, loginInfo)

        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: loginInfo
        })
    }catch(err){
        console.log(err)
    }
}


const logoutUser = (req: Request, res: Response) => {
     const isProd = process.env.NODE_ENV === "production";
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/"
    })

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/"
    })

    res.status(201).json({
        success: true,
        message: "User logged out successfully",
        data: null
    })
}

export const authControlelr = {
    loginUser,
    logoutUser
}