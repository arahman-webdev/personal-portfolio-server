import { NextFunction, Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utills/jwt";
import { prisma } from "../config/db";
import AppError from "../errorHelper/AppError";


export enum Role{
    ADMIN = "ADMIN"
}

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || req.cookies.accessToken;


    if (!token) {
      throw new AppError(403, "No token received");
    }

    const verifiedToken = verifyToken(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
    // console.log("✅ Decoded Token:", verifiedToken);
    // console.log("✅ Required Roles:", authRoles);

    console.log("from verified token",verifiedToken)

    

    const isUserExist = await prisma.user.findUnique({where: {email: verifiedToken?.useremail}});




    if (!isUserExist) {
      throw new AppError(404, "User does not exist");
    }

    if (!authRoles.includes(verifiedToken.userRole)) {
      throw new AppError(403, "You are not permitted to view this route!!!");
    }
    


    req.user = verifiedToken;
    next();
  } catch (error) {
    console.log("❌ Auth error:", error);
    next(error);
  }
};
