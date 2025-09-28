import { Request, Response } from "express";
import { blogService } from "./blog.service";

const createPost = async(req:Request, res:Response)=>{
    try{
        const result = await blogService.createPost(req.body)

        res.status(201).json({
            status: true,
            message: "Blog post created successfully",
            data: result
        })
    }catch(err){
        console.log(err)
    }
}



export const blogControlelr = {
    createPost
}