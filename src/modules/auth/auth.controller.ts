import { Request, Response } from "express"
import { authService } from "./auth.service"
import { setAuthCookie } from "../../utills/setCookies"
import AppError from "../../errorHelper/AppError";

const loginUser = async (req: Request, res: Response) => {
  try {
    const loginInfo = await authService.loginUser(req.body);

    // Set cookies
    setAuthCookie(res, loginInfo);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: loginInfo,
    });
  } catch (err: any) {
    console.log(err);

    // Handle AppError specifically
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }

    // Fallback for unknown errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { loginUser };


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