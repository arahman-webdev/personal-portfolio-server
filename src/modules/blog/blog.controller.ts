import { Request, Response } from "express";
import { blogService } from "./blog.service";
import AppError from "../../errorHelper/AppError";

const createPost = async(req:Request, res:Response)=>{
    try{
        const result = await blogService.createPost(req.body)

        res.status(201).json({
            status: true,
            message: "Blog post created successfully",
            data: result
        })
    }catch(err){
        throw new AppError(404, "Something is missing")
    }
}



export const blogControlelr = {
    createPost
}