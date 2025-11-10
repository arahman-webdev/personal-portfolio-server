// user.controller.ts
import { Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelper/AppError";
import { userSerivice } from "./user.service";


  const  getMe = async (req: Request, res: Response) => {
    try {
      const decodedToken = req.user as JwtPayload;


      if (!decodedToken || !decodedToken.userId) {
        throw new AppError(401, "Unauthorized");
      }

      const user = await userSerivice.getSingleUser(decodedToken.userId);

      res.status(200).json({
        success: true,
        message: "Retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      console.log(error);
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }

  const getAllusers = async(req: Request, res: Response) =>{
    try{
      const result = await userSerivice.getAllusers()
      res.json({
        success: true,
        message: "User retrived successfully",
        data: result
      })
    }catch(err){
      console.log(err)
    }
  }



export const UserController = {
  getMe,
getAllusers
}
