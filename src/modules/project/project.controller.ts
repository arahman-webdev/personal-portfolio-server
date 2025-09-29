import { Request, Response } from "express";
import { projectService } from "./project.service";

const createProject = async(req:Request, res:Response)=>{
    try{
        const project = await projectService.createProject(req.body)
        

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        })
    }catch(err){
        console.log(err)
    }
}

export const projectController = {
    createProject
}