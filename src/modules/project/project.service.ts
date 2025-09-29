import { Prisma, Project } from "@prisma/client"
import { prisma } from "../../config/db"

const createProject = async(payload: Prisma.ProjectCreateInput):Promise<Project>=>{
    const result = await prisma.project.create({
        data:payload,
    })

    return result
}


export const projectService = {
    createProject
}